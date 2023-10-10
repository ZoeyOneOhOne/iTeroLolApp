const { SlashCommandBuilder } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const { logError } = require('../db');


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
client.login(token);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lockgame')
		.setDescription('Locks a game by a given id')
        .addStringOption(option => 
            option.setName('message-id')
                .setDescription('Message ID')
                .setRequired(true)
        ),
        async execute(interaction) {
            const messageId = interaction.options.getString('message-id'); 
                 try {
                    const targetChannel = client.channels.cache.get('1077612967639666738'); // bot set up
                    //const targetChannel = client.channels.cache.get('841678523286814742'); // pro play spoilers
                    if (!targetChannel) {
                        await interaction.reply('Target channel not found.');
                        return;
                    }

                    // Fetch the message by its ID
                    const message = await targetChannel.messages.fetch(messageId);
                
                    if (message) {
                        // Edit the message content to add "(locked)"
                        await message.edit(`${message.content} (LOCKED 🔒)`);
                        await interaction.reply('Game locked and message updated.');
                    } else {
                        await interaction.reply('Game found, but message not found.');
                    }
                } catch (error) {
                    console.error(error);
                    await interaction.reply('An error occurred while locking the game and updating the message.');
                    logError(error, messageId, '', 'An error occured while attempting to lock the game with the messageID: ' + messageId)
                }
        },
};