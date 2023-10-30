## Setting it up

To start run `npm install` to install packages then `npm start`

Make sure you're in the right directory - UGA-Geoguessr\packages\uga-geoguessr

Copy template.env and rename the copy to `.env`

## About some of the packages ive installed

### Tailwind

Tailwind is a really easy way to write CSS quickly. Instead of typing out your css in a .module.css or .css file, you can type it directly into the tsx,ts,js,jsx files classname section. This lets you really quickly bootstrap your css. We'll probably have to convert this to normal css later though.

It lets you use shorthand to abbreviate things.

[Tailwind Docs](https://tailwindcss.com/docs/installation)

### ThreeJS Fiber and Drei

In case we want to upload our own locations, we can display our own panorama images using this.
ThreeJS is what lets us create and render 3d objects in the browser using OpenGL.

Normally threejs is something you would use with html and js, but Fiber lets us use it with react components easily.

Drei provides extra functionallity ontop of Fiber and gives us things like the camera controls that we use the drag the camera around in the street view

[Fiber Docs](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

[Drei Docs](https://github.com/pmndrs/drei)

### React Router

Ive went ahead and installed the react router so that we can have pages in the react app.
The root.tsx file is the layout for the app, and all the other routes have to go through that.

[Example docs](https://reactrouter.com/en/main/start/concepts)

### @react-google-maps/api

For displaying the map

[npm page](https://www.npmjs.com/package/@react-google-maps/api)

Also using [react-google-streetview](https://www.npmjs.com/package/react-google-streetview) for google maps street view

### Really helpful example code

Since the react section of this course is literally taught from a udemy course heres all the example code from that course
[Uduemy course code that the professor uses](https://github.com/academind/react-complete-guide-code/tree/master)

### Other recommendations

prettier vscode extension. theres a config file for it set up so that they should be consistent.

Tailwind CSS intellisense VSCode extension

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
