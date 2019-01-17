# MeanStack-Login-Registration
This is a Single Page Application using MongoDB, ExpressJS, AngularJS, and NodeJS.
#Installation
Install all dependencies in package.json file. This can be done by navigating to the root directory in the command prompt/terminal/console
$ npm install
You must enter your own MongoDB configuration settings in the server.js file:

mongoose.connect('mongodb://localhost:8000/test', function(err) {
    if (err) {
        console.log('Not connected to the database: ');
    } else {
        console.log('Successfully connected to MongoDB');
    }
});

$ npm start server.js

#Contributors
Vineet Tijare
