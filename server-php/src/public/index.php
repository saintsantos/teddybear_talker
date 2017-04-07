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

require '../app/dependencies.php';
require '../app/calendar.php';
require '../app/files.php';


$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");
    $this->logger->addInfo("Cool things happened!");

    return $response;
});

//app->get('/user/{username}', getUsers);
//public function getUsers(Request $request, Response $response) {
/*$app->get('/user/{username}', function(Request $request, Response $response) {
    $this->logger->addInfo("Grabbing all users from the backend");
    $username = $request->getAttribute('route')->getArgument('username');
    $users = $this->db->query("SELECT * from users where username='$username'");
    $result = array();
    foreach( $users as $row) {
      //print_r($row["username"]);
      $user = array(
        'username' => $row["username"]
      );
      array_push($result, $user);
    }
    $json = json_encode($result);
    $this->logger->addInfo("stored!");
    return $json;
});*/



$app->run();
