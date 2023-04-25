const { SlashCommandBuilder } = require('discord.js');
const { teamList } = require('../teamList');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
client.login(token);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addgame')
		.setDescription('Sets up a game for placing bets.')
        .addStringOption(option =>
            option.setName('team1')
                .setDescription('Team 1')
                .setRequired(true)
			    .addChoices(
                    { name: 'Fnatic', value: 'Fnatic', },
                    { name: 'G2 Esports', value: 'G2 Esports' },
                    { name: 'Team VItality', value: 'Team VItality' },
                    { name: 'Team BDS', value: 'Team BDS' },
                    { name: 'Excel', value: 'Excel' },
                    { name: 'Astralis', value: 'Astralis' },
                    { name: 'SK Gaming', value: 'SK Gaming' },
                    { name: 'KOI', value: 'KOI' },
                    { name: 'MAD Lions', value: 'MAD Lions' },
                    { name: 'Team Heretics', value: 'Team Heretics' },
                    ))
        .addStringOption(option =>
            option.setName('team2')
                .setDescription('Team 2')
                .setRequired(true)
                .addChoices(
                    { name: 'Fnatic', value: 'Fnatic' },
                    { name: 'G2 Esports', value: 'G2 Esports' },
                    { name: 'Team VItality', value: 'Team VItality' },
                    { name: 'Team BDS', value: 'Team BDS' },
                    { name: 'Excel', value: 'Excel' },
                    { name: 'Astralis', value: 'Astralis' },
                    { name: 'SK Gaming', value: 'SK Gaming' },
                    { name: 'KOI', value: 'KOI' },
                    { name: 'MAD Lions', value: 'MAD Lions' },
                    { name: 'Team Heretics', value: 'Team Heretics' },
                )),
	async execute(interaction) {
        const team1 = interaction.options.getString('team1');
        const team2 = interaction.options.getString('team2');
        const teamArray = [team1, team2];
        let teamMessage1 = '';
        let teamMessage2 = '';
        let reaction1 = '';
        let reaction2 = '';

        const team1Info = teamList.find(team => team.name === teamArray[0]);
        const team2Info = teamList.find(team => team.name === teamArray[1]);
        teamMessage1 = team1Info.emoji + ' ' + team1Info.name;
        reaction1 = team1Info.reaction;
        teamMessage2 = team2Info.name + ' ' + team2Info.emoji;
        reaction2 = team2Info.reaction;

        // Send the message and add rections
        // const message = await interaction.reply({content: teamMessage1 + ' vs ' + teamMessage2, fetchReply: true});
        const message = await interaction.reply({content: 'Game posted.', fetchReply: true});
        const message2 = await client.channels.cache.get('1077612967639666738').send(teamMessage1 + ' vs ' + teamMessage2);
        let id = message2.id;
        message2.react(reaction1);
        message2.react(reaction2);
        //console.log(id);
	},
};