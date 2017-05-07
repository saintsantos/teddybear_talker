# Teddy Bear Talker Wireless Router setup
To begin anything we first need to setup the raspberry pi zero to connect to wifi. Follow the steps at the link [here](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
Once you are connected, just follow the rest of the guide here and you should be ready to go.
In order to setup the bear for wireless routing capabilities there are a couple packages that are required in order to use the raspberry pi as a wireless router. These can be installed using the command below:
```sh
sudo apt-get install hostapd dnsmasq
```
`Dnsmasq` Serves ip addresses to any devices connected to the raspberry pi.
`Hostapd` Allows for the conversion of the wireless adapter as a router. It broadcasts the SSID of the secured wireless network for the bear. The password to connect to the bear is `teddy_bear`

Once you have installed all of the packages, setup for this is fairly straightforward. Simply copy the files in the `/router` directory and you should be ready to go.
```sh
cd <directory of teddybear_talker>/router
sudo mv /etc/network/interfaces /etc/network/interfaces.bak
sudo cp interfaces /etc/network/interfaces
sudo cp hostapd.conf /etc/hostapd/
sudo cp dnsmasq.conf /etc/
```
do a quick reboot with
```sh
sudo reboot
```
and you're ready to turn on your wifi! Simply open
```sh
sudo nano /etc/network/interfaces
```
now there are two sets of lines that change in these files. One to turn on wifi and connect to the internet, another to turn on the wifi router so users can connect to the bear:
Uncommenting this set will allow the device to connect to wifi and have internet access.
```sh
#Used to allow for connection to wifi
auto wlan0
allow-hotplug wlan0
iface wlan0 inet dhcp
    wpa_conf /etc/wpa_supplicant/wpa_supplicant.conf
```

Uncommenting this set will allow the wireless network Tabil to be spawned and let others connect to it. There is no internet connection in this mode:
```sh
auto wlan0
iface wlan0 inet static
hostapd /etc/hostapd/hostapd.conf
address 192.168.8.1
netmask 255.255.255.0
```

Once you have chosen which wifi you want to use, simply toggle it by running
```sh
sudo ifdown wlan0
sudo ifup wlan0
```
and the wireless settings you have chosen will be applied.


