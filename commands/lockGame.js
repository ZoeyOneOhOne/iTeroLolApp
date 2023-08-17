const { SlashCommandBuilder } = require('discord.js');
const { collectorMap } = require('../collectorManager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock-game')
		.setDescription('Locks a game by a given id')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Message ID')
                .setRequired(true)
        ),
        async execute(interaction) {
            const messageId = interaction.options.getString('input'); 

            // Retrieve the collector from the map
            const collector = collectorMap.get(messageId);
            if (collector) {
                // Stop the collector and remove it from the map
                collector.stop();
                collectorMap.delete(messageId);
                await interaction.reply('Game locked.');
            } else {
                await interaction.reply('Game not found.');
            }
        },
};