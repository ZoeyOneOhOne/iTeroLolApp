const { SlashCommandBuilder } = require('discord.js');
const { reportGame } = require('../db');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reportgame')
		.setDescription('Report the result of a game.')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Message ID')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('winner')
                .setDescription('Winner')
                .setRequired(true)
			    .addChoices(
                    { name: 'Bilibili Gaming', value: 'Bilibili Gaming'},
                    { name: 'JDG Gaming', value: 'JDG Gaming'},
                    { name: 'Gen.G', value: 'Gen.G'},
                    { name: 'T1', value: 'T1'},
                    { name: 'Cloud9', value: 'Cloud9'},
                    { name: 'Golden Guardians', value: 'Golden Guardians'},
                    { name: 'G2 Esports', value: 'G2 Esports'},
                ))
        .addStringOption(option =>
            option.setName('games')
                .setDescription('Number of games')
                .setRequired(true)
                .addChoices(
                    { name: '2', value: '2'},
                    { name: '3', value: '3'},
                    { name: '4', value: '4'},
                    { name: '5', value: '5'},
                )),
	async execute(interaction) {
        const messageId = interaction.options.getString('input'); 
        const winner = interaction.options.getString('winner'); 
        const games = interaction.options.getString('games');

        await reportGame(winner, messageId, games);



        await interaction.reply(winner + ' won '+ games +' games in the series.');
	},
};