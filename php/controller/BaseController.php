<?php
class BaseController
{
    public function __call($name, $arguments)
    {
        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
    }

    protected function isPOST()
    {
        return strtoupper($_SERVER["REQUEST_METHOD"]) == 'POST';
    }

    protected function isGET()
    {
        return strtoupper($_SERVER["REQUEST_METHOD"]) == 'GET';
    }

    protected function getUriSegments()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);

        return $uri;
    }

    protected function getQueryStringParams()
    {
        parse_str($_SERVER['QUERY_STRING'], $output);
        return $output;
    }

    protected function sendOutput($data, $httpHeaders = array())
    {
        header_remove('Set-Cookie');

        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }

        echo $data;
        exit;
    }

    protected function sendError($errorDesc = "Unknown error", $errorCode = "HTTP/1.1 500 Internal server error")
    {
        $this->sendOutput(
            json_encode(array('error' => $errorDesc)),
            array('Content-Type: application/json', $errorCode)
        );
    }
}
