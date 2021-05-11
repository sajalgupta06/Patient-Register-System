## Packages Used
   "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-jwt": "^6.0.0",
    "formidable": "^1.2.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.12.3",
    "nodemon": "^2.0.7"


## DataBase and Postman Link

## To See Database, Login in mongodb atlas using following credentials 


## Postman Link 
https://documenter.getpostman.com/view/15290580/TzCTYQ2j#f8a904ac-4cd0-4cd9-88db-a2c773895e47



## Feature
Authentication is done through Fully Secured JWT tokens and are stored in cookies which will autmatically expires after 10 minutes
Role-based Authentication.
Mongodb Database
JSON for communication through APIs.
Postman to list all your APIs

## API GUIDE

Psychiatrist Ids ->

Yash Tokekar   -  606e881037c73d857864e78c
Sajal Gupta    -  606e87fa37c73d857864e78b
Anant Singhal  -  606e87df37c73d857864e78a
Rohan Agrawal    -  606e87b637c73d857864e789
Garima Singh   -  606e8e8696818488a05c9093
Akshat Jain    -  606e8eaa96818488a05c9094
or you can create more and use their object id

Patients

For Sign up  Patient->    http://localhost:8000/api/signup
<!-- For signup you need a psychiatrist Id . You can take from above or you can create new Psychiarists and use its object id -->

For Sign in  Patient->    http://localhost:8000/api/signin
For Updating  Patient->   http://localhost:8000/api/user/update
For Deleting  Patient->   http://localhost:8000/api/user/patientId
For Patient Photo->       http://localhost:8000/api/user/photo/patientid
For Signout Patient->     http://localhost:8000/api/signout

For fetching all patient for a single psychiatrist   http://localhost:8000/api/user/psychiatristId

For Fetch the count of how many patients are registered for each psychiatrist in a hospital->  http://localhost:8000/api/psychiatrist/info

For adding Psychiatrist-> http://localhost:8000/api/psychiatrist/create



## deployment
1. clone repository
2. run command npm init
3. run command "npm install" (this will install all dependencies required for the project)
4. run command "npm start"


