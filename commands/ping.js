const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const message = await interaction.reply({ content: 'Pong!', fetchReply: true });
		message.react('😄');
		message.react('👾');
		await wait(2000);
		await interaction.editReply('Pong again!');
	},
};