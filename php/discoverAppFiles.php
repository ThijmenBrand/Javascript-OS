<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

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
