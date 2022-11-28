# Project 
XP Diagnosis is a card game designed to assess a team's understanding and adoption of Agile values and eXtreme Programming practices. The main goal being to generate a healthy discussion between all members of the team about a series of topics, picked up mostly at random.

There are four types of cards: Practices, Problems, Solutions and Values. Each card contains a short description - some times just a word, some times a small paragraph - that relates to some aspect of software development.

Once a new game is started, the cards are randomly distributed across four decks. Team members then proceed to, one at a time, pick a deck to reveal its topmost card and the team discusses how that topic is present in their daily work, how good the team is doing with regards to that, possibilities of improvements, so on. Depending on the type of the card, the focus of the discussion might change. Instead of choosing a deck to have a random card, team members can also choose to pick a specific card type, and then a random card of that type (if any are still in play) will be chosen and drawn from its deck, instead.

The game can be used in a meeting facilitated by a Scrum Master, Agile Coach, or someone else with deep knowledge of Agile and XP, who can explain the topics and answer questions as they appear.

The topics present in the cards are heavily inspired by Kent Beck's excellent book "Extreme Programming Explained". Knowledge of that book by the facilitator is recommended.

# How to play online
At the moment, a version of the game is hosted [here](https://xp-diagnosis.onrender.com/). It is configured to always be up-to-date with the "main" branch of this repository.

# How to install and run locally
After cloning this repository and assuming you have npm installed, go to the root folder of the repo and run `npm install` to install all dependencies (first time only), and `npm start` to start a development server. You will be able to find the page at localhost:3000.

More info can be found in the "Create React App Stuff" session below.

# Create React App Stuff
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
