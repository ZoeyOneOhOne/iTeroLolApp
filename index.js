const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, messageLink } = require('discord.js');
const { token } = require('./config.json');
const { teamList } = require('./teamList');


// Set up team list
const teamIDs = [];
for (let team of teamList) {
	teamIDs.push(team.emoji.replace(/[^0-9.]/g, ''));
  }

// Set up roles
// const acceptedRoles = ['Founder', 'The Board', 'Community Manager', 'Staff', 'Deputy Mods', 'BotMaster'];
const acceptedRoleIDs = ['761266506235379712', '761266861115441162', '1004747752980353084', '1029408764899635211', '1061776397091209387', '1077611324793688094'];

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
let voterArray1 = [];
let voterArray2 = [];
let reaction1 = null;
let reaction2 = null;

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}



// Log in to Discord with your client's token
client.login(token);

// Handling slash commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


// When the client is ready, run this code (only once)
// Use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


// TODO: OCT: 10th deadline

//1.) Bot doesn't like there to be numbers in the name of teams

//2.) Kick bot and re-add so Collin can change name and pic.

//4.) Scoreboard

//5.) Consolidate teamsList properties

//6.) Come up with a way to differentiate games in chat

//7.) When game locks edit the message and say locked

//8.) Add game needs to acccept a new parameter (number of series (2 or 3))