const { SlashCommandBuilder } = require('discord.js');
const { reportGame } = require('../db');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reportgame')
		.setDescription('Report the result of a game.')
        .addStringOption(option => 
            option.setName('message-id')
                .setDescription('Message ID')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('winner')
                .setDescription('Winner')
                .setRequired(true)
			    .addChoices(
                    {name: 'Bilibili Gaming', value: 'Bilibili Gaming'},
                    {name: 'CTBC Flying Oyster', value: 'CTBC Flying Oyster'},
                    {name: 'Cloud9', value: 'Cloud9'},
                    {name: 'DetonatioN FocusMe', value: 'DetonatioN FocusMe'},
                    {name: 'Dplus KIA', value: 'Dplus KIA'},
                    {name: 'Fnatic', value: 'Fnatic'},
                    {name: 'G2 Esports', value: 'G2 Esports'},
                    {name: 'GAM Esports', value: 'GAM Esports'},
                    {name: 'Gen.G', value: 'Gen.G'},
                    {name: 'Golden Guardians', value: 'Golden Guardians'},
                    {name: 'JD Gaming', value: 'JD Gaming'},
                    {name: 'KT Rolster', value: 'KT Rolster'},
                    {name: 'LNG Esports', value: 'LNG Esports'},
                    {name: 'LOUD', value: 'LOUD'},
                    {name: 'MAD Lions ', value: 'MAD Lions '},
                    {name: 'Movistar R7', value: 'Movistar R7'},
                    {name: 'NRG', value: 'NRG'},
                    {name: 'PSG Talon', value: 'PSG Talon'},
                    {name: 'T1', value: 'T1'},
                    {name: 'Team BDS', value: 'Team BDS'},
                    {name: 'Team Liquid', value: 'Team Liquid'},
                    {name: 'Team Whales', value: 'Team Whales'},
                    {name: 'Weibo Gaming', value: 'Weibo Gaming'},
                ))
        .addStringOption(option =>
            option.setName('games')
                .setDescription('Number of games')
                .setRequired(true)
                .addChoices(
                    { name: '1', value: '1'},
                    { name: '2', value: '2'},
                    { name: '3', value: '3'},
                    { name: '4', value: '4'},
                    { name: '5', value: '5'},
                )),
	async execute(interaction) {
        const messageId = interaction.options.getString('message-id'); 
        const winner = interaction.options.getString('winner'); 
        const games = interaction.options.getString('games');

        await reportGame(winner, messageId, games);

        // Check if the interaction is still valid
        if (interaction.replied) {
        // Interaction has already been replied to
        console.log('Interaction has already been replied to');
        return;
        }

        await interaction.reply(winner + ' won '+ games +' games in the series.');
	},
};