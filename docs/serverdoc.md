# Tabil PHP Server Design Documentation

## These steps are meant for the raspberry pi zero W running raspbian, but many of the packages are similar across different operating systems.
## Note: Server development for this project is best done on linux.
### PHP server setup:
This server requires several things to run properly. PHP7.0, PHP7.0-mysql, and [Slim Framework](https://www.slimframework.com/). Be sure to read the slim framework documentation because it will get you up and running quickly. We will be installing all of these tools in the next few steps.
First, we have to add the debian stretch repository since at the time of writing this doc debian is the Jessie build, which does not have PHP7.0 in its package list.  
We first have to edit `/etc/apt/sources.list` and add the line  
```
deb http://mirrordirector.raspbian.org/raspbian/ stretch main contrib non-free rpi
```
under the first empty line in the file. After that file is edited we need to add a preferences file so the system will choose Jessie packages by default and only use stretch packages when we request them. We do that by creating a preferences file in `/etc/apt` by:
```sh
sudo touch /etc/apt/preferences
```
and add:
```sh
Package: *
Pin: release n=jessie
Pin-Priority: 600
```
save the file and
```sh
sudo apt-get update
```
in order to update the pakage database to have access to the new packages.  
Now we're ready to install PHP7.0. Installing PHP 7.0 after this is very straightforward:  
```sh
sudo apt-get install -t stretch php7.0 php7.0-curl php7.0-cli php7.0-fpm php7.0-cli php7.0-opcache php7.0-mbstring php7.0-xml php7.0-zip php7.0-readline php7.0-sqlite
```
This will install all basic PHP packages and the PHP driver for SQlite onto our system. Next, we need to get composer, which is the dependency manager for this application. There are several steps required to install composer onto our system. The steps for downloading php's composer dependency manager are outlined [here](https://getcomposer.org/download/) and installing the application globally using the steps outlined [here](https://getcomposer.org/doc/00-intro.md#globally)  
Once we have the application installed locally, cd into  
```
<path to root of teddybear_talker repo>/server/src/
```
and run  
```
composer install
```
to install all required dependencies, such as Slim Framework, for the backend server for teddybear talker. Once the isntaller finishes cd into `/public` and run start the server:
```
php -S localhost:8080
```
for the local server
```
php -S 0.0.0.0:8080
```
when running on the bear. This will start the server and have it listen to the specified port on the specified ip. `0.0.0.0` means listen to the device ip, which is `192.168.8.1`.  
Now we can call any of the endpoints on the server and test if functionality works. We can do this using [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) or [httpie](https://httpie.org/) if you're a terminal junkie.  

The first time you run the application it might say that you will have an error about being unable to find a database file. Simply edit this line in `/server/src/public/index.php`
```php
$config['db']['file'] = '/home/edwin/git/school/cse453/teddy_bear_talker/database/';
```
and replace with the path to your database. Make sure it is named `bear.db` or you will have to change the name of the database in `/server/src/app/dependencies.php`

There are two more things you can change as well. In `/server/src/app/dependencies.php` there are two sets of code:
```php
$container['jingledir'] = function($c) {
  $jinglepath = '/home/edwin/Music/jingle';
  return $jinglepath;
};

$container['voicedir'] = function($c) {
  $voicepath = '/home/edwin/Music/voice';
  return $voicepath;
}
```
you can change voicepath and jinglepath to where you would like the files you send to teddybear_talker to be copied to when they're uploaded.

### Endpoint Documentation:
All callable enpoints for Teddybear Talker are listed here. Each endpoint will be listed similar to how they are represented in the source code. Namely:
#### `/blah/` represents the group.
*  `/endpoint/` represents an endpoint in the group.
	* Description of functionality of endpoint 
	* Method: The http request method the endpoint accepts.
	* params: Any params that are accessible through the URL. These are represented in the endpoint as {param}.
	* data: data to pass into the body request.
	* Returns: Data that is returned from the endpoint.  

This example endpoint would be called by calling `http://localhost:8080/blah/endpoint/`

#### `/calendar` Group
* `/`
	* Grab all events for the week
	* `GET`
	* params: none
	* data: none
	* Returns: the listing of all events for the week
* `/add`
	* Add a new event to the bear
	* `POST`
	* params: none
	* data: 
	```
    {
    	"timeDay": String,
    	"voice_id": Integer, 
    	"jingle_id": Integer, 
    	"day": String
     }
     ```
     * Returns: none
* `/test`
	* test endpoint for uploading events
	* params: none
	* data:
	```
    {
    	"timeDay": String,
    	"voice_id": Integer, 
    	"jingle_id": Integer, 
    	"day": String
     }
     ```
     * Returns: none
* `/{day}`
	* Get the events of a single day as specified by {day}
	* `GET`
	* params: `{"day": String}`
	* data: none
	* Returns: The list of all events schedule during the specified day of the week
* `/{id}`
	* Delete an event from the bear
	* `DELETE`
	* params: `{"id": Integer}`
	* data: none
	* Returns: none
* `/{id}`
	* Update an event
	* `PUT`
	* params: `{"id": Integer}`
	* data:
	```
    {
    	"timeDay": String,
    	"voice_id": Integer, 
    	"jingle_id": Integer, 
    	"day": String
     }
     ```
     * Returns: none

#### `/voice` group
* `/`
	* Get all voices uploaded to the bear
	* `GET`
	* params: none
	* data: none
	* Returns: the listing of all voices uploaded to the bear
* `/upload`
	* Upload a new voice to the bear
	* `POST`
	* params: none
	* data: `audiofile` (.mp3 only)
    * Returns: none
* `/{id}`
	* Edit a voice on the bear
	* `PUT`
	* params: `{"id": Integer}`
	* data:
	```
    {
    	"voice_name": String, 
    	"voicepath": String
     }
     ```
     * Returns: none
* `/{id}`
	* Delete a voice from the bear
	* `DELETE`
	* params: `{"id": Integer}`
	* data: none
	* Returns: none
#### `/jingle` group
* `/`
	* Get all jingles uploaded to the bear
	* `GET`
	* params: none
	* data: none
	* Returns: the listing of all jingles uploaded to the bear
* `/upload`
	* Upload a new jingle to the bear
	* `POST`
	* params: none
	* data: `audiofile` (.mp3 only)
    * Returns: none
* `/{id}`
	* Edit a jingle on the bear
	* `PUT`
	* params: `{"id": Integer}`
	* data:
	```
    {
    	"jingle_name": String, 
    	"jinglepath": String
     }
     ```
     * Returns: none
* `/{id}`
	* Delete a jingle from the bear
	* `DELETE`
	* params: `{"id": Integer}`
	* data: none
	* Returns: none
#### `/system` group
* `/down`
	* Will bring down the server and frontend when called
	* `POST`
	* params: none
	* data: none
	* Returns: none
* `/reboot`
	* Reboots bear
	* `POST`
	* params: none
	* data: none
	* Returns: none
* `/sneeze`
	* Test sneeze sound on the bear
	* `POST`
	* params: none
	* data: none
	* Returns: none
* `/date`
	* Update date on the bear
	* `POST`
	* params: none
	* data:
	```
    {
   		"day": String,
        "month": String,
        "year": String,
        "hour": String,
        "minute": String,
    }
    ```
    * Returns none
* `/drop`
	* Drop all the tables in the database
	* `POST`
	* params: none
	* data: none
	* Returns: none
#### `/test` group
* `/event/{id}
	* Tests the sound order for an event
	* `POST`
	* params: `{"id": Integer}
	* data: none
	* Returns: none
* `/voice/{id}
	* Tests a voice sound
	* `POST`
	* params: `{"id": Integer}
	* data: none
	* Returns: none
* `/jingle/{id}`
	* Tests a jingle sound
	* `POST`
	* params: `{"id": Integer}
	* data: none
	* Returns: none
