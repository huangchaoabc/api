# api
```
php -S 0.0.0.0:8080 -t . -e <<< '<?php isset($_GET["url"]) ? readfile($_GET["url"]) : readfile("content.php");'
```
