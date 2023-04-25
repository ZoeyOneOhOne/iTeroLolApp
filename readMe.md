# Developer Documentation

## Setting up the bot

Clone the bot into your local repo and run ```npm install```

## Running the bot

To start the bot run ```node index.js```

## Adding new slash commands

Create the new command file in the commands folder. Deploy the command using ```run node deploy-commands.js```

# Admin Documentation

## Adding new teams

### Step 1
In the `teamList.js` file add the `name`, `reaction`, and `emoji` maintaining the format. It's easiest to just copy the last team object and paste it below then just swap the values (make sure the bottom object has a comma at the end). The `reaction` property is the team logo emoji ID without it's taggs. This is necessary becasue an emoji in a message and an emoji in a reaction are not the same.

### Step 2
 Naviage to `IteroLolApp/commands/addGame.js`. In `addGame.js` add the new team to both lists in the same format as they appear. Follow the instructions from step 1 again making sure to leave a commma.