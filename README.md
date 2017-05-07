# Teddybear talker
Your cuddly customizable friend that talks!

This is the branch for the development of Teddybear Talker.
We setup the codebase to be easily extensible for new developers to add
features to their bears.

## Getting started:
### Starting frontend:
Make sure you have yarn installed:
```sh
npm install -g yarn
```

got to the angular app directory and run:
```sh
yarn
```
to install all dependencies, then simply run:
```sh
yarn start
```
to start the app itself.

### Starting backend:
Make sure you have php7 and composer installed.
```sh
cd <teddybear_talker dir>/server-php/src/ && composer install
```

next up you need to enable the php sqlite drivers in order to interface with
the built-in sqlite database. To do that run the command below to open the
php.ini:
```sh
sudo vim /etc/php/php.ini
```
and make sure you uncomment the lines:
```
extension=pdo_sqlite.so
extension=sqlite3.so
```
lastly, go to the teddybear talker directory and edit line 17 in dependencies.app in
`server-php/src/app/` to where your database file is located. It should look like this:
```js
$pdo = new PDO("sqlite:/<dir of teddybear_talker>/database/bearfinal.db");
```

Once you have all of that set up simply run:
```sh
php -S localhost:8080
```
from the `/server-php/src/public` directory and the backend for the app will run.

If you have issues connecting to the backend using the frontend, install this
chrome extension [here](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=chrome-app-launcher-info-dialog)

toggle the switch if it doesn' initially work and you're ready to go.

After that you should be ready to go!
