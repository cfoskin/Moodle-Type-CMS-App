# Moodle-Type MEAN Stack Application

This is a college project which allows a user to create modules and add some files to the module. It will also allow the user to view the full list of uploaded files and then drag and drop some files onto a module. 

This is a CRUD application which a Node.js API and Angular.js front end. Mongo is used as a database. The files are uploaded to an AWS S3 bucket and the name and URL of the file are saved to the database.

To run mongo must be installed and running.

Install dependencies:
    
       npm install
       
Start server:

      node index.js
      
Run tests:

      npm test
