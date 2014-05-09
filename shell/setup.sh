#!/bin/sh

# Quick setup script for development. Don't run while the server is
# running. Will kill the servers db daemon instance.

# Install Development Tools
#sudo npm install -g bower grunt-cli

# Install node and bower modules
#npm install 
#bower install

# Import default data into database

./shell/db.sh & # start database daemon instance

sleep 2 # should only need to wait a few second for mongo to start up

cd data # go into data directory

find . -type f | xargs -I{} basename {} | xargs -I{} ../shell/import.sh {}

killall mongod
