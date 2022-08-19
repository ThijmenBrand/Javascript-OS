<?php

use Directory as GlobalDirectory;

class File
{
    public $fileContent = "";
    public $mimeType = "";
}

class Dir
{
    public $filePath = "";
    public $fileType = "";
}

class FileSystemController extends BaseController
{
    public function showUserFiles()
    {
        if ($this->isGET()) {
            $arrQueryStringParams = $this->getQueryStringParams();

            $filePath = $arrQueryStringParams['dir'];
            $files = glob($filePath . '/*');

            $allPaths = [];

            foreach ($files as $file) {
                $dir = new Dir();

                $dir->filePath = $file;
                $dir->fileType = filetype($file);
                array_push($allPaths, $dir);
            }

            $this->sendOutput(
                json_encode($allPaths),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
            exit();
        }

        $this->sendError("Method not supported", "HTTP/1.1 422 Unprocessable Entity");
    }

    public function openFile()
    {
        if ($this->isGET()) {
            $arrQueryStringParams = $this->getQueryStringParams();

            $filePath = $arrQueryStringParams['dir'];
            $file = new File();
            $myFile = fopen($filePath, "r") or die("Unable to open file!");
            $file->mimeType = mime_content_type($filePath);
            $file->fileContent = fread($myFile, filesize($filePath));

            $this->sendOutput(
                json_encode($file),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
            fclose($myFile);
            exit();
        }

        $this->sendError("Method not supported", "HTTP/1.1 422 Unprocessable Entity");
    }
}
