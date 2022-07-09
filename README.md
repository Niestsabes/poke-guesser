# Getting Started with PokéGuesser

PokéGuesser is an open-source project created by Sébastien Cayet.

Concepts qnd designs are inspired by Wordle, the "Who's that Pokémon?" meme and the Pokemon battle system.
Everyday, you will randomly encounter a wild Pokémon. You have 5 lives to guess who that Pokémon is.

For each try, you propose a letter.
If that letter is contained in Pokemon's name, then all occurences of that letter are revealed.
However, if Pokémon's name does not contain that letter, you lose a life.

**Fully reveal the name of the Pokémon before losing your lives to win.**

Access the game by clicking on this link: [pokeguesser.azurewebsites.net](https://pokeguesser.azurewebsites.net) to play the game.

## Available NPM Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
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