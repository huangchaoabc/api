<?php
define("REG_KEY", "ac25c67ddd8f38c1b37a2348828e222e");

class FqReq
{
    private $ch;
    private $var;

    public function __construct($var)
    {
        $this->var = $var;
        $this->ch = curl_init();
    }

    public function batchGet($itemIds, $download = false)
    {
        $headers = [
            "Cookie: install_id=" . $this->var->install_id
        ];

        $url = "https://api5-normal-sinfonlineb.fqnovel.com/reading/reader/batch_full/v";
        $params = [
            "item_ids" => $itemIds,
            "req_type" => $download ? "0" : "1",
            "aid" => $this->var->aid,
            "update_version_code" => $this->var->update_version_code
        ];

        $url = $url . '?' . http_build_query($params);

        curl_setopt_array($this->ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        ]);

        $response = curl_exec($this->ch);
        if (curl_errno($this->ch)) {
            throw new Exception('Curl error: ' . curl_error($this->ch));
        }

        $retArr = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('JSON decode error: ' . json_last_error_msg());
        }

        ksort($retArr['data']);
        return $retArr;
    }

    public function getRegisterKey()
    {
        $headers = [
            "Cookie: install_id=" . $this->var->install_id
        ];

        $url = "https://api5-normal-sinfonlineb.fqnovel.com/reading/crypt/registerkey";
        $params = ["aid" => $this->var->aid];
        $url = $url . '?' . http_build_query($params);

        $crypto = new FqCrypto(REG_KEY);
        $payload = json_encode([
            "content" => $crypto->newRegisterKeyContent($this->var->server_device_id, "0"),
            "keyver" => 1
        ]);

        curl_setopt_array($this->ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => array_merge($headers, ["Content-Type: application/json"]),
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        ]);

        $response = curl_exec($this->ch);
        if (curl_errno($this->ch)) {
            throw new Exception('Curl error: ' . curl_error($this->ch));
        }

        $retArr = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('JSON decode error: ' . json_last_error_msg());
        }

        $keyStr = $retArr['data']['key'];
        return bin2hex($crypto->decrypt($keyStr));
    }

    public function getDecryptContents($resArr)
    {
        $key = $this->getRegisterKey();
        $crypto = new FqCrypto($key);

        foreach ($resArr['data'] as $itemId => &$content) {
            $byteContent = $crypto->decrypt($content['content']);
            $content['originContent'] = gzdecode($byteContent);
            unset($content['content']); // 移除加密内容
        }

        return $resArr;
    }

    public function __destruct()
    {
        curl_close($this->ch);
    }
}

class FqCrypto
{
    private $key;
    private $cipher;

    public function __construct($key)
    {
        $this->key = hex2bin($key);
        if (strlen($this->key) !== 16) {
            throw new Exception("Key length mismatch! key: " . bin2hex($this->key));
        }
        $this->cipher = 'aes-128-cbc';
    }

    public function encrypt($data, $iv)
    {
        $res = openssl_encrypt($data, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv);
        if ($res === false) {
            throw new Exception("Encrypt failed: " . openssl_error_string());
        }
        return $res;
    }

    public function decrypt($data)
    {
        $decodedData = base64_decode($data);
        if ($decodedData === false) {
            throw new Exception("Base64 decode failed");
        }

        $iv = substr($decodedData, 0, 16);
        $encryptedData = substr($decodedData, 16);

        $res = openssl_decrypt($encryptedData, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv);
        if ($res === false) {
            throw new Exception("Decrypt failed: " . openssl_error_string());
        }
        return $res;
    }

    public function newRegisterKeyContent($serverDeviceId, $strVal)
    {
        if (!is_numeric($serverDeviceId) || !is_numeric($strVal)) {
            throw new Exception("Invalid parameters: server_device_id={$serverDeviceId} str_val={$strVal}");
        }

        $combined = pack('P2', (int)$serverDeviceId, (int)$strVal);
        $iv = openssl_random_pseudo_bytes(16);
        return base64_encode($iv . $this->encrypt($combined, $iv));
    }
}

class FqVariable
{
    public $install_id;
    public $server_device_id;
    public $aid;
    public $update_version_code;

    public function __construct($install_id, $server_device_id, $aid, $update_version_code)
    {
        $this->install_id = $install_id;
        $this->server_device_id = $server_device_id;
        $this->aid = $aid;
        $this->update_version_code = $update_version_code;
    }
}

// 设置响应头
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

try {
    // 验证参数
    if (!isset($_GET['item_id']) || empty($_GET['item_id'])) {
        http_response_code(400);
        exit(json_encode(['error' => 'Missing item_id parameter'], JSON_UNESCAPED_UNICODE));
    }

    $item_id = trim($_GET['item_id']);
    if (!preg_match('/^\d+$/', $item_id)) {
        http_response_code(400);
        exit(json_encode(['error' => 'Invalid item_id format'], JSON_UNESCAPED_UNICODE));
    }

    // 初始化配置
    $var = new FqVariable(
        "4427064614339001",
        "4427064614334905",
        "1967",
        "62532"
    );

    // 获取内容
    $client = new FqReq($var);
    $response = $client->batchGet($item_id);
    $decrypted = $client->getDecryptContents($response);

    // 验证数据存在性
    if (!isset($decrypted['data'][$item_id])) {
        http_response_code(404);
        exit(json_encode(['error' => 'Content not found'], JSON_UNESCAPED_UNICODE));
    }

    // 构建响应
    $result = [
        'data' => [
            'item_id' => $item_id,
            'title'   => $decrypted['data'][$item_id]['title'],
            'content' => $decrypted['data'][$item_id]['originContent']
        ]
    ];

    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
