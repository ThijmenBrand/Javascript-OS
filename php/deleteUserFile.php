<?php
$fileToDelete = $_POST['filePath'];
$folderExtension = $_POST['fileExt'];

//path check of the daadwerkelijk userFIles is.

if ($folderExtension == 'dir') {
    rmdir($fileToDelete);
} else {
    unlink($fileToDelete);
}