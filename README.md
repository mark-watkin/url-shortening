# PrimaryBid - URL shortening
A simple application that provides URL shortening functionality.

## Prerequisites
To run this application you need docker installed on your machine and port 80 must be available for the application to bind to. 

## Running the application
Clone the repository onto your local machine
```
git clone git@github.com:mark-watkin/url-shortening.git
```

Build the docker containers:
```
docker-compose build
```

Run the docker containers:
```
docker compose up -d
```

Navigate to [http://pbid.localhost/](http://pbid.localhost/) in your browser to access the front end react application where you can create shortened urls.

Navigate to [http://api.pbid.localhost/](http://api.pbid.localhost/) to view the api contract for the express server that creates and returns shortened urls.

Once you have created a shortened url you can navigate to [http://db.pbid.localhost/db/test](http://db.pbid.localhost/db/test) to view the data stored in the mongodb database.

Once you are done using the application shut down the docker containers:
```
docker compose down
```

## Architectural overview
This project consists of the following components:
* React front end - this application is served from nginx and provides the UI for calling the express server to create and retreive shortened urls.

* Express js api - this api provides a rest api for the front end react application to persist and retrieve shortened urls from a mongodb database.

* Mongodb - this is used to persist the shortened urls as well as generates sequences required for the shortcode generation algorithm.

* Mongo express - this is a helpful tool for viewing and modifying the data stored in the mongodb database.

* Nginx proxy - this is used as a reverse proxy to direct traffic to the appropriate server when making requests to pbid.localhost, api.pbid.localhost and db.pbid.localhost

## Shortcode generation algorithm
The api generates 8 character short code that consist of lowercase characters and numbers. Selecting an 8 character short code from 36 possible characters provides a maximum of 2.8 trillion (2,821,109,907,456) unique short codes that could be generated.

For every created url we retrieve a new auto incrementing seqence from the database. If we base 36 encode this sequence value we can guarantee to generate a unique short code for all 2.8 trillion possibilities. However base 36 encoding an auto incrementing number will provide highly guessable and itterable results. 

We need to introduce additional randomness into our algorithm to make these shortened urls appear more random. To do this I have introduced a random first character to the short code. We then use this first randomly generated character as a seed to shuffle our array of 36 possible characters. Now we can base 36 encode our auto incrementing ID against our shuffled array of 36 characters to generate the remaining 7 characters in the short code. This approach still guarantees we will generate unique short codes and our results become near impossible to predict.

The cost of introducing this additional randomness to our algorithm is that the first character is now used to introduce randomness, meaning we only have 7 characters to encode our auto incrementing ID. This reduces the number of urls that we can generate unique short codes for from 2.8 trillion down to 78 billion (78,364,164,096).

## Local development
The repo is split into two main projects the api and the ui.

Each of these projects is set up to be developed against independently however they each make the assumption that their dependent services will be running in docker.

Run the docker containers with the following:
```
docker compose up -d
```

The commands for running both the UI and API are consistent for simplicity.

Install dependencies:
```
npm install
```

Run the application:
```
npm run dev
```

The application will rebuild as you update it.

Run the tests:
```
npm run test
```

## Future enhancements
* Continuous delivery ready - If I had more time I would add a single end to end test to provide additional confidence that all components integrate correctly. Once this additional test is part of the release pipeline I would be confident in setting this project up for continuous delivay. 

* Improve CORS controls - The current cors policy allows requests from all origins. Given more time I would restrict this to specific origins to ensure greater security of the application.

* Monitoring & logging - I left logging and monitoring and tracking out of scope for this application, but for it to be truely production ready I would look to add metrics, tracking and additional logging to give the development and product team greater visibility into how the application is running.