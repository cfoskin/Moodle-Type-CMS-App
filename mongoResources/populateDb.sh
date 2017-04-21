#!/bin/bash
mongoimport --host localhost --port 27017  --db moodle --collection users --file users.json
mongoimport --host localhost --port 27017  --db moodle --collection files --file files.json
mongoimport --host localhost --port 27017  --db moodle --collection modules --file modules.json