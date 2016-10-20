# The Project

<a href='http://scheduler.fulton.asu.edu:8080/job/tutor-questions-github/'><img src='http://scheduler.fulton.asu.edu:8080/job/tutor-questions-github/badge/icon'></a> 

A simple software system to increase the efficiency of a tutoring center
by allowing students to queue up their questions and allow tutors to react
appropriately. It consists of three major components.

1. An user interface for students to browse courses and alert the tutors
when they have a question.
2. An realtime display for the current question queue.
3. An administrating page for managing courses and tracking system usage.

## Goals

The primary goals of the systems are as follows: 

1. A __simple__ and __intuitive__ interface for students. 
2. __Non-Obtrusive__ usage, for both _tutors_ and _students_.
3. Real-Time _statistics_ aggregation for the most up-to-date information.

## Installation Instructions

To run the application, [node.js](http://nodejs.org/) and
[mongodb](http://www.mongodb.org/) must be installed. They have thorough
installation instruction for most platforms.

After node.js and mongodb are installed, you can simply clone the
repository with:

    git clone https://github.com/djblue/project.git

Client side dependencies are already in the repository, however server
side dependencies are managed with node's package manager _npm_. To
install those dependences, simply run the command: 
    
    npm install

Finally, to start the application, run the command:
    
    nodejs app.js

The application will be accessible through
[localhost](http://localhost:3000)

__NOTE__: statistical tracking will only occur if a mongodb server is
running on the current machine. To start a mongodb server, run the
command: 

    mongod

## Dependencies

The project leverages many modern and powerful Javascript libraries. Their
API page are listed below for quick reference.

- [node.js](http://nodejs.org/docs/latest/api/) for the server.
- [mongodb](http://mongodb.github.io/node-mongodb-native/) for the database.
- [express](http://expressjs.com/api.html) for the RESTFul api.
- [socket.io](http://socket.io/) for realtime application updates.
- [jquery](http://api.jquery.com/) for DOM manipulation.
- [backbone](http://backbonejs.org/) for client-side mvc.
- [requirejs](http://requirejs.org/docs/api.html) for client-side asynchronous module loading.
- [jasmine](https://jasmine.github.io/) for testing.
- [d3](https://github.com/mbostock/d3/wiki/API-Reference) for data visualization.
- [hammer](https://github.com/EightMedia/hammer.js/wiki) for multi-touch gestures.
