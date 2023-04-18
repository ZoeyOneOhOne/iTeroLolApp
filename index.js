const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, messageLink } = require('discord.js');
const { token } = require('./config.json');
const { teamList } = require('./teamList');

// Set up team list
const teamIDs = [];
for (let team of teamList) {
	teamIDs.push(team.reaction);
  }

// Set up roles
const roles = ['Founder', 'The Board', 'Community Manager', 'Botmaster', 'Staff', 'Deputy Mods'];

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

client.on('messageReactionAdd', (reaction, user) => {
	if (!reaction.message?.reactions.cache.find(v => v.emoji.id === '1086474462834200687')) { // If the stop emoji doesnt yet exist
		if (teamIDs.includes(reaction.emoji.id)) {
			if (user.username !== 'IteroBetBot') {
				console.log('Ya');
				console.log(reaction.message.member.roles.cache.find(r => r.name = 'Bot Master'));
			}
			if(!reaction1) {
				reaction1 = reaction.emoji.id;
			} else if (!reaction2) {
				reaction2 = reaction.emoji.id;
			} 
			if (reaction.emoji.id === reaction1) {
				if (user.username !== 'IteroBetBot') {
					voterArray1.push(user.username)
				}
			} else if (reaction.emoji.id === reaction2) {
				if (user.username !== 'IteroBetBot') {
					voterArray2.push(user.username)
				}
			}
			console.log (voterArray1, voterArray2);
		}
	}

	if (reaction.emoji.id === '1086474462834200687') { //If stop emoji
		if (user.id != '235113888973062155') { // If the user who added the stop emoji isnt Admin then remove it
		reaction.message.reactions.cache.get('1086474462834200687').remove()
			.catch(error => console.error('Failed to remove reactions:', error));

		// Problem right now is that if Collin has added the stop emoji and then I try to add it again it removes both of ours, not just mine.

		} else {
		console.log('Array1', voterArray1);
		console.log('Array2',voterArray2);
		 let finalString1 = '';
		 let finalString2 = '';
		 voterArray1.forEach(element => {
			 finalString1 += element + " \n"
		 });
		 voterArray2.forEach(element => {
			finalString2 += element + " \n"
		});
		const team1 = teamList.find(team => team.reaction === reaction1);
		const team2 = teamList.find(team => team.reaction === reaction2);
		finalString1 += 'Voted for ' + team1.name + ' ' + team1.emoji;
		finalString2 += 'Voted for ' + team2.name + ' ' + team2.emoji;
		client.channels.cache.get('1077612967639666738').send(finalString1);
		client.channels.cache.get('1077612967639666738').send(finalString2);
		}
	}

});

// When the client is ready, run this code (only once)
// Use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
