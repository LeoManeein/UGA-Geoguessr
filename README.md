## Overview

This is a student made UGA based Geoguessr Game MERN application.

* To play the game, first make an account to be on the leaderboard and save your previos games.

* Then choose your desired gametype (Locations across entire campus or across a section of campus), number of rounds, and difficulty. You get extra points the harder your difficulty is.

* When you start the game, you will be placed in a random google street view on campus and your goal is to choose the closest location to the street view on the provided map and you will get a score based on distance.

* For the leaderbaord, Top 10 scores across all users for the 5 round category will be shown.

* Finally, go to your profile to see your previous games and a hotmap of your accuracy on locations (green for accurate, red for inaccurate)


## Project Structure
```
.
├── backend
│   ├── src
│   │   ├── middleware
│   │   │   ...
│   │   ├── models
│   │   │   ...
│   │   ├── routes
│   │   │   └── api
│   │   │       ...
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   │   ...
│   │   ├── pages
│   │   │   ...
│   │   └── app.txs
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── package.json
├── docker-compose.yaml
└── README.md
```

## How to run the project on docker containers

First, download Docker Desktop.

Next, make sure you have all the secrets in a .env file in the root directory

Then, in the root directory of the project:

* To build the docker images: `$ docker-compose build`

* To use the images and run docker containers: `$ docker-compose up`

Finally, in your browser type in: `localhost:3000` and the project should be running.

## How to run the project on the local machine

Back end is running on port 4000, front end is running on port 3000

Currently the react front end is using a proxy to emulate them running on the same port in the dev environment. in the frontend's `package.json` because `"proxy": "http://localhost:4000",`

We're using the [concurrently](https://www.npmjs.com/package/concurrently) package to be able to run multiple commands from this top level directory

Run `npm install` in the main top level directory

run `npm install -g nodemon`

Run `npm run update-backend` and `npm run update-frontend` to install npm packages (from the top level directory again)

Set up ENV for backend and frontend. Also put one in the top level directory.

Run `npm run dev` to run frontend and backend with 1 command from the top directory. This is a custom script thats in the top level directory's package.json.

The backend has the nodemon package installed to enable hot refresh when developing the server. So instead of running `node server.js` and having to rerun that command after every change, running `nodemon server.js` will restart the server whenever you change it.

### Backend

To run the backend on its own, cd into it and then run `npm install` if theres been any changes and then `node src/server.js` or `nodemon src/server.js` for hot reload

OR

from top level directory you ran use `npm run dev-backend`

### Frontend

Follow the instructions in the other readme

OR

from top level directory you ran use `npm run dev-frontend`
