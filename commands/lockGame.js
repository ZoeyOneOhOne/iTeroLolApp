const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lockgame')
		.setDescription('Locks game and counts votes.'),
	async execute(interaction) {
		await interaction.reply('<:FNC:1014887969808711800>');
	},
};