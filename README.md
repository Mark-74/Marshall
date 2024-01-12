# Marshall
## How to set up
* run ``` npm i ``` in the project folder to install all the required dependencies;
* Create a config.json file and insert your bot token and client ID;
> like in the example below
```json
{
    "token": "..."
    "clientId": "..."
}
```
* run ``` node . ``` on the project folder to start the bot.

## How to Add Features
The bot is organised in this way:
* In ``` index.js ``` the client is created and the Guild permissions are requested;
* In the ``` commands ``` directory there is already a ``` moderation ``` folder in which are stored the moderation - related commands;
* To add other interactions outside of the ``` moderation ``` folder you have to create another folder inside ``` commands ``` and in there add your ``` interaction_name.js ``` files.
