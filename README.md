# DuckieBot
A rubber duckie Discord bot that can interpret/compile/run code.
This Discord bot uses API provided by paiza.io to allow users to interpret/compile/run code.
Users can send DuckieBot code and a language name. DuckieBot then POSTs a request with paiza.io and eventually GETs the result, showing the output to the user as well as other relevant information.

# Installation/Setup
This project uses **yarn** to manage the node modules that this project is dependent on. Be sure to install it before continuing.

First, clone the repo to the directory of your choice.

#### Setting up a Discord Bot Application and Getting the Bot Token for Authentication
Once that is done, go to discord.com/developers/applications and create a **New Application** and setup a bot there.
Head to the **Bot** page in your application and copy the **Token**.
Afterwards, go to the *config.ts* file in your project and set config.token to equal the token you have just copied (as a string).

#### Installing dependencies
Open a terminal to the project's directory.
Run the command `yarn install` to install all the dependencies necessary to run this project.
Once that is complete, simply run `yarn build` to build the project.

#### Adding DuckieBot to your Discord Server
Go to your Discord bot application page and make sure you are on the **General Information** tab.
You should see the **Client ID**. Copy this.
Head to address below in your browser of choice, but replace the *CLIENT_ID_HERE* section with the Client ID that you have just copied.
https://discord.com/oauth2/authorize?client_id=CLIENT_ID_HERE&scope=bot&permissions=523328
Follow the instructions on the page.

# Running the bot
Simply open a terminal to the project's directory and run `yarn start` to start the project. This should work given you have built the project at least once before.

# Commands

`$run -l LANGUAGE_NAME_HERE ``` SOURCE CODE HERE ``` `

Run code in one of many different languages supported by paiza.io. -l represents the language flag to be followed by the name of the language that the code is written in.

`$languages`

Displays a list of the languages supported by DuckieBot.
