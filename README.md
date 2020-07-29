# How to Build Rest API with NodeJs, Express and Mysql

### Tech

This example uses a number of open source projects to work properly:

* [node.js]
* [Express]
* [mysql2]
* [bcryptjs]
* [jsonwebtoken]
* [express-validator]
* [dotenv]
* [cors]

### Getting Started

``` sh
# Clone this repo to your local machine using
git clone git@github.com:Juliest88/mysql-node-express.git

# Get into the directory
cd mysql-node-express

# Make it your own
rm -rf .git && git init

# Coppy .env-example and create your own .env file
cp .env-example .env

# Edit .env file and add your mysql username, mysql password and db name
vi .env
# you can edit the file also via text editor

# Get into the db directory
cd src/db

# Import mysql database using Command line
mysql -u [db_username] -p[db_password] < create-user-db.sql
# you can edit the file if you want to change the db_name
# if you are using a different db_name and it elready exists,
# you can comment the first two lines, remain the line => USE test_db;
# and just change the db_name

# Install dependencies
npm install

# Run the server locally
npm start

# Run the server locally in dev mode
npm run dev
```

**Enjoy :)**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [git-repo-url]: <https://github.com/Juliest88/mysql-node-express.git>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [mysql2]: <https://github.com/sidorares/node-mysql2#readme>
   [bcryptjs]: <https://github.com/dcodeIO/bcrypt.js#readme>
   [jsonwebtoken]: <https://github.com/auth0/node-jsonwebtoken#readme>
   [express-validator]: <https://express-validator.github.io/docs/>
   [dotenv]: <https://github.com/motdotla/dotenv#readme>
   [cors]: <https://github.com/expressjs/cors#readme>
