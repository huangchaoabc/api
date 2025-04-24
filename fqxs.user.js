// ==UserScript==
// @name              番茄小说下载器
// @version           2025.04.25.6
// @description       番茄小说下载
// @description:zh-cn 番茄小说下载
// @description:en    Fanqienovel Downloader (Large Display)
// @license           MIT
// @match             https://fanqienovel.com/*
// @require           https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @icon              data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zNS40Mjg2IDQuODg0MzVDMzkuNjQ2MyA0Ljg4NDM1IDQzLjA4MTYgOC4zMTk3MyA0My4wODE2IDEyLjUzNzRWMzUuNDI4NkM0My4wODE2IDM5LjY0NjMgMzkuNjQ2MyA0My4wODE2IDM1LjQyODYgNDMuMDgxNkgxMi41Mzc0QzguMzE5NzMgNDMuMDgxNiA0Ljg4NDM1IDM5LjY0NjMgNC44ODQzNSAzNS40Mjg2VjEyLjUzNzRDNC44ODQzNSA4LjMxOTczIDguMzE5NzMgNC44ODQzNSAxMi41Mzc0IDQuODg0MzVIMzUuNDI4NlpNMzUuNDI4NiA0SDEyLjUzNzRDNy44MDk1MiA0IDQgNy44MDk1MiA0IDEyLjUzNzRWMzUuNDI4NkM0IDQwLjE1NjUgNy44MDk1MiA0My45NjYgMTIuNTM3NCA0My45NjZIMzUuNDI4NkM0MC4xNTY1IDQzLjk2NiA0My45NjYgNDAuMTU2NSA0My45NjYgMzUuNDI4NlYxMi41Mzc0QzQ0IDcuODA5NTIgNDAuMTU2NSA0IDM1LjQyODYgNFoiIGZpbGw9IiMzMzMiLz48cGF0aCBkPSJNMjkuMTAxNiA0VjEyLjQwMTRMMzIuMzMyOSAxMC41NjQ2TDM1LjU2NDEgMTIuNDAxNFY0SDI5LjEwMTZaIiBmaWxsPSIjMzMzIi8+PHBhdGggZD0iTTI0LjAzNCAxOC4yODU4QzE1LjgzNjcgMTguMjg1OCA4LjU1NzgyIDIxLjg1NzIgNCAyNy4zNjc0VjM1LjQyODZDNCA0MC4xNTY1IDcuODA5NTIgNDMuOTY2IDEyLjUzNzQgNDMuOTY2SDM1LjQyODZDNDAuMTU2NSA0My45NjYgNDMuOTY2IDQwLjE1NjUgNDMuOTY2IDM1LjQyODZWMjcuMjY1NEMzOS40MDgyIDIxLjc4OTIgMzIuMTk3MyAxOC4yODU4IDI0LjAzNCAxOC4yODU4Wk0xNC42MTIyIDM3LjY3MzVDMTMuMTE1NiAzNy42NzM1IDEyLjQwMTQgMzcuMTI5MyAxMi40MDE0IDM2LjQxNUMxMi40MDE0IDM1LjcwMDcgMTMuMDgxNiAzNS4xMjI1IDE0LjU3ODIgMzUuMTIyNUMxNi4wNzQ4IDM1LjEyMjUgMTcuODc3NiAzNi4zODEgMTcuODc3NiAzNi4zODFDMTcuODc3NiAzNi4zODEgMTYuMTA4OCAzNy42NzM1IDE0LjYxMjIgMzcuNjczNVpNMTUuODM2NyAzMS4yMTA5QzE0Ljc0ODMgMzAuMTU2NSAxNC42NDYzIDI5LjI3MjIgMTUuMTU2NSAyOC43NjJDMTUuNjY2NyAyOC4yNTE4IDE2LjU1MSAyOC4zMTk4IDE3LjYzOTUgMjkuNDA4MkMxOC43Mjc5IDMwLjQ2MjYgMTkuMDY4IDMyLjYwNTUgMTkuMDY4IDMyLjYwNTVDMTkuMDY4IDMyLjYwNTUgMTYuODkxMiAzMi4yNjU0IDE1LjgzNjcgMzEuMjEwOVpNMjQuMDM0IDMwLjQ2MjZDMjQuMDM0IDMwLjQ2MjYgMjIuNzQxNSAyOC43Mjc5IDIyLjcwNzUgMjcuMTk3M0MyMi43MDc1IDI1LjcwMDcgMjMuMjUxNyAyNC45ODY0IDIzLjk2NiAyNC45ODY0QzI0LjY4MDMgMjQuOTg2NCAyNS4yNTg1IDI1LjY2NjcgMjUuMjU4NSAyNy4xNjMzQzI1LjI5MjUgMjguNjkzOSAyNC4wMzQgMzAuNDYyNiAyNC4wMzQgMzAuNDYyNlpNMzAuMzYwNSAyOS4zNzQyQzMxLjQ0OSAyOC4zMTk4IDMyLjMzMzMgMjguMjUxOCAzMi44NDM1IDI4LjcyNzlDMzMuMzUzNyAyOS4yMzgxIDMzLjI1MTcgMzAuMTIyNSAzMi4xNjMzIDMxLjE3NjlDMzEuMDc0OCAzMi4yMzEzIDI4LjkzMiAzMi41Mzc1IDI4LjkzMiAzMi41Mzc1QzI4LjkzMiAzMi41Mzc1IDI5LjI3MjEgMzAuNDI4NiAzMC4zNjA1IDI5LjM3NDJaTTMzLjM1MzcgMzcuNjczNUMzMS44NTcxIDM3LjY3MzUgMzAuMDg4NCAzNi4zNDcgMzAuMDg4NCAzNi4zNDdDMzAuMDg4NCAzNi4zNDcgMzEuODU3MSAzNS4wODg1IDMzLjM4NzggMzUuMDg4NUMzNC44ODQ0IDM1LjA4ODUgMzUuNTk4NiAzNS43MDA3IDM1LjU2NDYgMzYuMzgxQzM1LjU2NDYgMzcuMTI5MyAzNC44NTAzIDM3LjY3MzUgMzMuMzUzNyAzNy42NzM1WiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==
// @grant             GM_xmlhttpRequest
// @grant             GM_addStyle
// @connect           api5-normal-sinfonlineb.fqnovel.com
// @connect           i.snssdk.com
// @namespace         https://github.com/tampermonkey
// ==/UserScript==

(function() {
    'use strict';

    // 配置常量
    const CONFIG = {
        REG_KEY: "ac25c67ddd8f38c1b37a2348828e222e",
        INSTALL_ID: "4427064614339001",
        SERVER_DEVICE_ID: "4427064614334905",
        AID: "1967",
        VERSION_CODE: "62532",
        MAX_CONCURRENT: 20,
        RETRY_TIMES: 5,
        RETRY_DELAY: 500
    };

    // 超大界面样式
    GM_addStyle(`
        .tamper-container {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            padding: 30px;
            z-index: 9999;
            width: 400px;
            font-size: 28px;
            line-height: 1.5;
        }
        .tamper-button {
            background-color: #ff6b00;
            color: white;
            border: none;
            border-radius: 40px;
            padding: 20px 40px;
            margin: 20px 0;
            cursor: pointer;
            font-size: 28px;
            font-weight: bold;
            transition: all 0.3s;
            width: 100%;
            text-align: center;
        }
        .tamper-button:hover {
            background-color: #ff5500;
        }
        .tamper-button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        .stats-container {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            font-size: 24px;
        }
        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            padding: 10px;
        }
        .stat-label {
            margin-bottom: 10px;
            color: #666;
        }
        .stat-value {
            font-weight: bold;
            font-size: 32px;
        }
        .total-value { color: #333; }
        .success-value { color: #4CAF50; }
        .failed-value { color: #F44336; }
    `);

    // 加密解密类（保持不变）
    class FqCrypto {
        constructor(key) {
            this.key = this.hexToBytes(key);
            if (this.key.length !== 16) {
                throw new Error(`Invalid key length! Expected 16 bytes, got ${this.key.length}`);
            }
            this.cipherMode = { name: 'AES-CBC' };
        }

        hexToBytes(hex) {
            const bytes = [];
            for (let i = 0; i < hex.length; i += 2) {
                bytes.push(parseInt(hex.substr(i, 2), 16));
            }
            return new Uint8Array(bytes);
        }

        bytesToHex(bytes) {
            return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        }

        async encrypt(data, iv) {
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                this.key,
                { name: 'AES-CBC' },
                false,
                ['encrypt']
            );
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-CBC', iv },
                cryptoKey,
                this.pkcs7Pad(data)
            );
            return new Uint8Array(encrypted);
        }

        async decrypt(data) {
            const iv = data.slice(0, 16);
            const ct = data.slice(16);
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                this.key,
                { name: 'AES-CBC' },
                false,
                ['decrypt']
            );
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-CBC', iv },
                cryptoKey,
                ct
            );
            return this.pkcs7Unpad(new Uint8Array(decrypted));
        }

        pkcs7Pad(data) {
            const blockSize = 16;
            const padding = blockSize - (data.length % blockSize);
            const padded = new Uint8Array(data.length + padding);
            padded.set(data);
            for (let i = data.length; i < padded.length; i++) {
                padded[i] = padding;
            }
            return padded;
        }

        pkcs7Unpad(data) {
            const padding = data[data.length - 1];
            if (padding > 16) return data;
            for (let i = data.length - padding; i < data.length; i++) {
                if (data[i] !== padding) return data;
            }
            return data.slice(0, data.length - padding);
        }

        async generateRegisterContent(deviceId, strVal = "0") {
            if (!/^\d+$/.test(deviceId) || !/^\d+$/.test(strVal)) {
                throw new Error("Invalid device ID or value");
            }
            
            const deviceIdBytes = new Uint8Array(8);
            const deviceIdNum = BigInt(deviceId);
            for (let i = 0; i < 8; i++) {
                deviceIdBytes[i] = Number((deviceIdNum >> BigInt(i * 8)) & BigInt(0xFF));
            }
            
            const strValBytes = new Uint8Array(8);
            const strValNum = BigInt(strVal);
            for (let i = 0; i < 8; i++) {
                strValBytes[i] = Number((strValNum >> BigInt(i * 8)) & BigInt(0xFF));
            }
            
            const combined = new Uint8Array([...deviceIdBytes, ...strValBytes]);
            const iv = crypto.getRandomValues(new Uint8Array(16));
            const encrypted = await this.encrypt(combined, iv);
            
            const result = new Uint8Array([...iv, ...encrypted]);
            return btoa(String.fromCharCode(...result));
        }
    }

    // API客户端类（保持不变）
    class FqClient {
        constructor(config) {
            this.config = config;
            this.crypto = new FqCrypto(config.REG_KEY);
            this.dynamicKey = null;
            this.keyExpireTime = 0;
            this.requestQueue = [];
            this.activeRequests = 0;
        }

        async throttledApiRequest(method, endpoint, params = {}, data = null) {
            return new Promise((resolve, reject) => {
                const execute = async () => {
                    try {
                        this.activeRequests++;
                        const result = await this._apiRequest(method, endpoint, params, data);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    } finally {
                        this.activeRequests--;
                        this.processQueue();
                    }
                };

                if (this.activeRequests < CONFIG.MAX_CONCURRENT) {
                    execute();
                } else {
                    this.requestQueue.push(execute);
                }
            });
        }

        processQueue() {
            while (this.requestQueue.length > 0 && this.activeRequests < CONFIG.MAX_CONCURRENT) {
                const nextRequest = this.requestQueue.shift();
                nextRequest();
            }
        }

        async _apiRequest(method, endpoint, params = {}, data = null) {
            const url = new URL(`https://api5-normal-sinfonlineb.fqnovel.com${endpoint}`);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            
            const headers = {
                "Cookie": `install_id=${this.config.INSTALL_ID}`,
                "User-Agent": "okhttp/4.9.3"
            };
            
            if (data) {
                headers["Content-Type"] = "application/json";
            }
            
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: method,
                    url: url.toString(),
                    headers: headers,
                    data: data ? JSON.stringify(data) : undefined,
                    onload: (response) => {
                        if (response.status >= 200 && response.status < 300) {
                            try {
                                resolve(JSON.parse(response.responseText));
                            } catch (e) {
                                reject(new Error(`Failed to parse response: ${e.message}`));
                            }
                        } else {
                            reject(new Error(`API request failed with status ${response.status}`));
                        }
                    },
                    onerror: (error) => {
                        reject(new Error(`API request error: ${error.error}`));
                    },
                    timeout: 10000
                });
            });
        }

        async getContentKeys(itemIds) {
            const itemIdsStr = Array.isArray(itemIds) ? itemIds.join(',') : itemIds;
            return this.throttledApiRequest(
                "GET",
                "/reading/reader/batch_full/v",
                {
                    item_ids: itemIdsStr,
                    req_type: "1",
                    aid: this.config.AID,
                    update_version_code: this.config.VERSION_CODE
                }
            );
        }

        async getDecryptionKey() {
            const now = Date.now();
            if (this.dynamicKey && this.keyExpireTime > now) {
                return this.dynamicKey;
            }
            
            const content = await this.crypto.generateRegisterContent(this.config.SERVER_DEVICE_ID);
            const payload = {
                content: content,
                keyver: 1
            };
            
            const result = await this.throttledApiRequest(
                "POST",
                "/reading/crypt/registerkey",
                { aid: this.config.AID },
                payload
            );
            
            const encryptedKey = Uint8Array.from(atob(result.data.key), c => c.charCodeAt(0));
            const decryptedKey = await this.crypto.decrypt(encryptedKey);
            this.dynamicKey = this.crypto.bytesToHex(decryptedKey);
            this.keyExpireTime = now + 3600000;
            
            return this.dynamicKey;
        }

        async decryptContent(encryptedContent) {
            const dynamicKey = await this.getDecryptionKey();
            const contentCrypto = new FqCrypto(dynamicKey);
            
            const decoded = Uint8Array.from(atob(encryptedContent), c => c.charCodeAt(0));
            const decrypted = await contentCrypto.decrypt(decoded);
            
            const decompressed = await this.gunzip(decrypted);
            return new TextDecoder().decode(decompressed);
        }

        async gunzip(data) {
            const ds = new DecompressionStream('gzip');
            const writer = ds.writable.getWriter();
            writer.write(data);
            writer.close();
            return new Response(ds.readable).arrayBuffer().then(arrayBuffer => new Uint8Array(arrayBuffer));
        }
    }

    // 辅助函数
    function decodeHtmlEntities(str) {
        const entities = {
            '&#34;': '"',
            '&#39;': "'",
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>'
        };
        return str.replace(/&#34;|&#39;|&amp;|&lt;|&gt;/g, match => entities[match]);
    }

    function sanitizeFilename(name) {
        return name.replace(/[\\/*?:"<>|]/g, '').trim();
    }

    function showNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.className = 'tamper-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 40px;
            right: 40px;
            background-color: ${isSuccess ? '#4CAF50' : '#F44336'};
            color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            z-index: 9999;
            font-size: 28px;
            animation: fadeIn 0.5s;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    function formatContent(content) {
        let decoded = decodeHtmlEntities(content);
        return decoded
            .replace(/<p><\/p>/g, '')
            .replace(/<p>/g, '')
            .replace(/<br\/?>/g, '\n')
            .replace(/<\/p>/g, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/\n{3,}/g, '\n')
            .replace(/^\s+|\s+$/g, '');
    }

    function createDownloadUI() {
        const container = document.createElement('div');
        container.className = 'tamper-container';
        
        const btn = document.createElement('button');
        btn.className = 'tamper-button';
        btn.textContent = '下载全本';
        container.appendChild(btn);
        
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-container';
        
        const totalStat = document.createElement('div');
        totalStat.className = 'stat-item';
        totalStat.innerHTML = `
            <div class="stat-label">总章节</div>
            <div class="stat-value total-value">0</div>
        `;
        
        const successStat = document.createElement('div');
        successStat.className = 'stat-item';
        successStat.innerHTML = `
            <div class="stat-label">成功</div>
            <div class="stat-value success-value">0</div>
        `;
        
        const failedStat = document.createElement('div');
        failedStat.className = 'stat-item';
        failedStat.innerHTML = `
            <div class="stat-label">失败</div>
            <div class="stat-value failed-value">0</div>
        `;
        
        statsContainer.appendChild(totalStat);
        statsContainer.appendChild(successStat);
        statsContainer.appendChild(failedStat);
        container.appendChild(statsContainer);
        
        document.body.appendChild(container);
        
        return {
            container,
            btn,
            updateStats: (total, success, failed) => {
                totalStat.querySelector('.stat-value').textContent = total;
                successStat.querySelector('.stat-value').textContent = success;
                failedStat.querySelector('.stat-value').textContent = failed;
            }
        };
    }

    async function getBookInfo(bookId) {
        const url = `https://i.snssdk.com/reading/bookapi/multi-detail/v/?aid=1967&book_id=${bookId}`;
        
        const response = await new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                headers: { 'User-Agent': 'okhttp/4.9.3' },
                onload: resolve,
                onerror: reject,
                timeout: 8000
            });
        });

        if (response.status !== 200) throw new Error(`HTTP ${response.status}`);

        const data = JSON.parse(response.responseText);
        if (!data.data || !data.data[0]) throw new Error('未获取到书籍信息');

        const book = data.data[0];
        return {
            title: sanitizeFilename(book.book_name),
            author: sanitizeFilename(book.author),
            abstract: book.abstract,
            wordCount: book.word_number,
            chapterCount: book.serial_count,
            infoText: `书名：${book.book_name}\n作者：${book.author}\n字数：${parseInt(book.word_number)/10000}万字\n章节数：${book.serial_count}\n简介：${book.abstract}\n免责声明：本小说下载器仅为个人学习、研究或欣赏目的提供便利，下载的小说版权归原作者及版权方所有。若因使用本下载器导致任何版权纠纷或法律问题，使用者需自行承担全部责任。`
        };
    }

    async function getChapters(bookId) {
        const url = `https://fanqienovel.com/api/reader/directory/detail?bookId=${bookId}`;
        
        const response = await new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                headers: { 'User-Agent': 'okhttp/4.9.3' },
                onload: resolve,
                onerror: reject,
                timeout: 8000
            });
        });

        if (response.status !== 200) throw new Error(`HTTP ${response.status}`);

        const text = response.responseText;
        const chapterListMatch = text.match(/"chapterListWithVolume":\[(.*?)\]]/);
        if (!chapterListMatch) throw new Error('未找到章节列表');

        const chapterListStr = chapterListMatch[1];
        const itemIds = chapterListStr.match(/"itemId":"(.*?)"/g).map(m => m.match(/"itemId":"(.*?)"/)[1]);
        const titles = chapterListStr.match(/"title":"(.*?)"/g).map(m => m.match(/"title":"(.*?)"/)[1]);
        
        return itemIds.map((id, index) => ({
            id: id,
            title: titles[index] || `第${index+1}章`
        }));
    }

    async function downloadChapter(client, chapter) {
        try {
            const encrypted = await client.getContentKeys(chapter.id);
            if (!encrypted.data || !encrypted.data[chapter.id]) {
                throw new Error('未获取到章节内容');
            }

            const decrypted = await client.decryptContent(encrypted.data[chapter.id].content);
            
            return {
                title: chapter.title,
                content: formatContent(decrypted),
                success: true
            };
        } catch (error) {
            console.error(`下载章节 ${chapter.title} 失败:`, error);
            return {
                title: chapter.title,
                content: `[下载失败: ${chapter.title}]`,
                success: false
            };
        }
    }

    async function downloadAllChapters(client, bookInfo, chapters, ui) {
        let content = `${bookInfo.infoText}\n\n`;
        const batchSize = CONFIG.MAX_CONCURRENT;
        let downloaded = 0;
        let successCount = 0;
        let failedCount = 0;

        // 初始化统计
        ui.updateStats(chapters.length, 0, 0);
        
        // 批量下载函数
        const downloadBatch = async (startIndex) => {
            const endIndex = Math.min(startIndex + batchSize, chapters.length);
            const batch = chapters.slice(startIndex, endIndex);
            
            const promises = batch.map(chapter => 
                downloadChapter(client, chapter)
                    .then(result => {
                        downloaded++;
                        if (result.success) {
                            successCount++;
                        } else {
                            failedCount++;
                        }
                        ui.updateStats(chapters.length, successCount, failedCount);
                        return result;
                    })
            );
            
            return Promise.all(promises);
        };

        // 分批下载所有章节
        for (let i = 0; i < chapters.length; i += batchSize) {
            const batchResults = await downloadBatch(i);
            for (const result of batchResults) {
                content += `\n\n${result.title}\n${result.content}`;
            }
        }

        return content;
    }

    async function handleBookPage(client, bookId) {
        // 获取书籍信息
        let bookInfo, chapters;
        try {
            bookInfo = await getBookInfo(bookId);
            chapters = await getChapters(bookId);
        } catch (error) {
            console.error('初始化失败:', error);
            showNotification('获取书籍信息失败', false);
            return;
        }

        // 创建下载UI
        const ui = createDownloadUI();
        
        ui.btn.addEventListener('click', async () => {
            if (ui.btn.disabled) return;
            
            ui.btn.disabled = true;
            ui.btn.textContent = '准备下载...';
            
            if (!confirm(`即将下载《${bookInfo.title}》全本，共${chapters.length}章，是否继续？`)) {
                ui.btn.disabled = false;
                ui.btn.textContent = '下载全本';
                return;
            }
            
            ui.btn.textContent = '下载中...';

            try {
                const startTime = Date.now();
                const content = await downloadAllChapters(client, bookInfo, chapters, ui);
                
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                saveAs(blob, `${bookInfo.title}.txt`);
                
                const duration = ((Date.now() - startTime) / 1000).toFixed(1);
                showNotification(`下载完成！共${chapters.length}章，耗时${duration}秒`);
                ui.btn.textContent = '下载完成';
            } catch (error) {
                console.error('下载失败:', error);
                showNotification('下载失败: ' + error.message, false);
                ui.btn.textContent = '下载失败';
            } finally {
                ui.btn.disabled = true;
            }
        });
    }

    // 主入口
    async function main() {
        const pathMatch = window.location.pathname.match(/\/page\/(\d+)/);
        if (!pathMatch) return;

        const bookId = pathMatch[1];
        const client = new FqClient(CONFIG);
        await handleBookPage(client, bookId);
    }

    // 启动主逻辑
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(main, 1000);
    } else {
        document.addEventListener('DOMContentLoaded', main);
    }
})();