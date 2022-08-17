<?php
$filePath = $_POST['filePath'];

function getDirContents($dir, &$results = array())
{
    $files = scandir($dir);

    foreach ($files as $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            $results[] = $path;
        } else if ($value != "." && $value != "..") {
            getDirContents($path, $results);
        }
    }

    return $results;
}

$appFiles = getDirContents($filePath);
$appContent = [];

class AppFile
{
    public $fileType = "";
    public $fileContent = "";
}

foreach ($appFiles as $appFile) {
    $myfile = fopen($appFile, "r") or die("Unable to open file!");
    $file = new AppFile();
    $file->fileType = pathinfo($appFile, PATHINFO_EXTENSION);
    $file->fileContent = fread($myfile, filesize($appFile));
    array_push($appContent, $file);
    fclose($myfile);
}

echo json_encode($appContent);
