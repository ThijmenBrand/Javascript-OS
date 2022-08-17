<?php

$defaultAppPath = '../apps/';

echo json_encode(glob($defaultAppPath . '/*' , GLOB_ONLYDIR));