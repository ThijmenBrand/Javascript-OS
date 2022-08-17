<?php

$filePath = $_POST['filePath'];

class File
{
    public $fileContent = "";
    public $mimeType = "";
}

$file = new File();
$myFile = fopen($filePath, "r") or die("Unable to open file!");
$file->mimeType = mime_content_type($filePath);
$file->fileContent = fread($myFile, filesize($filePath));
echo json_encode($file);
fclose($myFile);
