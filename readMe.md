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
In the `teamList.js` file add the `name`, `value`, `reaction`, and `emoji` maintaining the format:
````
{ name: 'KOI', value: 'KOI', reaction: '1065285604578959430', emoji: '<:KOI:1065285604578959430>'},
{ name: 'MAD Lions', value: 'MAD Lions', reaction: '1014887972266578000', emoji: '<:MAD:1014887972266578000>'},
{ name: 'Team Heretics', value: 'Team Heretics', reaction: '1065287618939600917', emoji: '<:TH:1065287618939600917>'},
{ name: 'Public Name', value: 'Private Name', reaction: 'New Reaction', emoji: 'New Emoji'},
````
The `name` property is the *public* name that everyone will see. `value` is the *private* name that is only used in business logic. These are fine to be the same, but don't have to be. `reaction` is the `emoji` without the surrounding tags. 

### Step 2
 Naviage to `IteroLolApp/commands/addGame.js`. In `addGame.js` add the new team to both lists in the same format as they appear:
 ````
 { name: 'KOI', value: 'KOI' },
 { name: 'MAD Lions', value: 'MAD Lions' },
 { name: 'Team Heretics', value: 'Team Heretics' },
 { name: 'Public Name', value: 'Private Name' },
 ````

 Save and commit your changes.