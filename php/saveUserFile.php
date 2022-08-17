<?php

$filePath = $_POST['filePath'];
$fileContent = $_POST['fileContent'];

if (!file_exists($filePath)) {
    exit;
}

$fileHandle = fopen($filePath, 'w');
fwrite($fileHandle, $fileContent);
fclose($fileHandle);

