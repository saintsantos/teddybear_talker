#!/bin/bash

# Install necessary packages
sudo apt install python3-dev git python3-venv nginx hostapd dnsmasq device-tree-compiler
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
source ~/.bashrc
nvm install node

# enable speaker
sudo dtc -I dts -O dtb -o /boot/dt-blob.bin dt-blob.dts

# nginx configuration
sudo cp /home/pi/teddybear_talker/router/tabil /etc/nginx/sites-available/tabil
sudo ln -s /etc/nginx/sites-available/tabil /etc/nginx/sites-enabled/tabil
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default

#backup all essentials
sudo cp /etc/network/interfaces /etc/network/interfaces.orig
sudo cp /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
sudo cp /etc/hostapd/hostapd.conf /etc/hostapd/hostapd.conf.orig

# networking setup
sudo cp /home/pi/teddybear_talker/router/interfaces /etc/network/interfaces
sudo cp /home/pi/teddybear_talker/router/dnsmasq.conf /etc/dnsmasq.conf
sudo cp /home/pi/teddybear_talker/router/hostapd.conf /etc/hostapd/hostapd.conf
sudo systemctl restart dnsmasq
sudo systemctl restart hostapd

# setup server
cd /home/pi/teddybear_talker/server/python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# build frontend
cd /home/pi/teddybear_talker/frontend
npm install
npm run build

# Service setup
sudo cp /home/pi/teddybear_talker/services/tabil.service /etc/systemd/system/tabil.service
sudo cp /home/pi/teddybear_talker/services/flex.service /etc/systemd/system/flex.service
sudo systemctl restart nginx
sudo systemctl daemon-reload
sudo systemctl enable tabil
sudo systemctl enable flex
sudo systemctl start tabil
sudo systemctl start flex
