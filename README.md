## Project structure

- UGA-Geoguessr
  - Packages
    - uga-geoguessr (Frontend)
    - backend

## How to run frontend and backend at the same time

Back end is running on port 4000, front end is running on port 3000

Currently the react front end is using a proxy to emulate them running on the same port in the dev environment. in `package.json` because `"proxy": "http://localhost:4000",`

Right now, open two new terminals in the UGA-Geoguessr top level directory in VS code.

### Backend

For the backend cd into it and then run `npm install` and then `node src/server.js`

### Frontend

Same thing, run `npm install` and `npm start`. Follow the instructions in the other readmes.
