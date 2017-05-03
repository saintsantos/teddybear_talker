<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['file'] = '/home/edwin/git/school/cse453/teddy_bear_talker/';


$app = new \Slim\App(["settings" => $config]);

require '../app/dependencies.php';
require '../app/calendar.php';
require '../app/voice.php';
require '../app/jingle.php';
require '../app/system.php';
require '../app/test.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


$app->get('/hi', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello!");
    $this->logger->addInfo("Sanity check!");

    return $response;
});

$app->run();
