# Getting Started with PokéGuesser

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available NPM Scripts

In the project directory, if [NodeJS](https://nodejs.org/en/) is installed on your environment, you can run:

### `npm install`

Installs package dependencies in node modules. 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Available Docker Scripts

In the project directory, if [Docker](https://www.docker.com/) is installed on your environment, you can run:

### `docker build . -t poke-guesser -f Dockerfile.local`

Builds the app in the development mode in a local container.\
The name of the container is *poke-guesser*.

### `docker run -dp 3000:3000 poke-guesser`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.