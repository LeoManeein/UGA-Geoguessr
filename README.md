## Project structure

- UGA-Geoguessr
  - Packages
    - uga-geoguessr (Frontend)
      - public (for stuff like client side only images)
      - src
        - pages
        - components
    - backend
      - src
        - server.js

## How to run frontend and backend at the same time

Back end is running on port 4000, front end is running on port 3000

Currently the react front end is using a proxy to emulate them running on the same port in the dev environment. in the frontend's `package.json` because `"proxy": "http://localhost:4000",`

We're using the [concurrently](https://www.npmjs.com/package/concurrently) package to be able to run multiple commands from this top level directory

Run `npm install` in the main top level directory

Run `npm run update-backend` and `npm run update-frontend` to install npm packages (from the top level directory again)

Run `npm run dev` to run frontend and backend with 1 command from the top directory. This is a custom script thats in the top level directory's package.json.

The backend has the nodemon package installed to enable hot refresh when developing the server. So instead of running `node server.js` and having to rerun that command after every change, running `nodemon server.js` will restart the server whenever you change it.

### Backend

To run the backend on its own, cd into it and then run `npm install` if theres been any changes and then `node src/server.js` or `nodemon src/server.js` for hot reload

OR

from top level directoy you ran use `npm run dev-backend`

### Frontend

Follow the instructions in the other readme

OR

from top level directoy you ran use `npm run dev-frontend`
