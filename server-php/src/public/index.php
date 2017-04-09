<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host'] = 'localhost';
$config['db']['user'] = 'root';
$config['db']['pass'] = 'new-password';
$config['db']['dbname'] = 'dev_teddybear_talker';


$app = new \Slim\App(["settings" => $config]);

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

require '../app/dependencies.php';
require '../app/calendar.php';
require '../app/files.php';


$app->get('/hi', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello!");
    $this->logger->addInfo("Sanity check!");

    return $response;
});

$app->run();
