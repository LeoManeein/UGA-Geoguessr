# Create image based on the official Node image from dockerhub
FROM node:20.10.0-buster

# Create app directory
WORKDIR /usr/src/app

# Installing nodemon
RUN npm install -g nodemon

# Copy dependency definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Install dependecies
RUN npm ci

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4000

# Serve the app
CMD [ "npm", "start" ]