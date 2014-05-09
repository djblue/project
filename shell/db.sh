#!/bin/sh

# Quick setup script for mongod daemon. (Assumes mongo is already
# installed). Make sure to run from root of project or directory that has
# the db directory.

# brutally kill any previous instances of mongod
killall mongod 2> /dev/null

# create directory if it doesn't already exist
mkdir -p ./db

# run mongo daemon which will block (CTRL-c to exit)
mongod --smallfiles --dbpath ./db > ./db/mongod.log
