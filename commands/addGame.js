const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
// const { teamList } = require('../teamList');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const { getTeams } = require('../db');

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
                    { name: 'Bilibili Gaming', value: 'Bilibili Gaming'},
                    { name: 'JDG Gaming', value: 'JDG Gaming'},
                    { name: 'Gen.G', value: 'Gen.G'},
                    { name: 'T1', value: 'T1'},
                    { name: 'Cloud9', value: 'Cloud9'},
                    { name: 'Golden Guardians', value: 'Golden Guardians'},
                    { name: 'G2 Esports', value: 'G2 Esports'},
                ))
        .addStringOption(option =>
            option.setName('team2')
                .setDescription('Team 2')
                .setRequired(true)
                .addChoices(
                    { name: 'Bilibili Gaming', value: 'Bilibili Gaming'},
                    { name: 'JDG Gaming', value: 'JDG Gaming'},
                    { name: 'Gen.G', value: 'Gen.G'},
                    { name: 'T1', value: 'T1'},
                    { name: 'Cloud9', value: 'Cloud9'},
                    { name: 'Golden Guardians', value: 'Golden Guardians'},
                    { name: 'G2 Esports', value: 'G2 Esports'},
                )),
	async execute(interaction) {
        // Set up team information
        const teamList = getTeams();
        const team1 = interaction.options.getString('team1');
        const team2 = interaction.options.getString('team2');
        const teamArray = [team1, team2];
        let teamMessage1 = '';
        let teamMessage2 = '';

        // I think the problem is right here. I did that (await teamList).find because it said teamList.find wasn't a function because teamList is a promise ig.
    

        console.log((await teamList).find(team => team.Name === teamArray[0]));
        const team1Info = (await teamList).find(team => team.Name === teamArray[0]);
        const team2Info = (await teamList).find(team => team.Name === teamArray[1]);
        teamMessage1 = team1Info.Emoji + ' ' + team1Info.Name;
        teamMessage2 = team2Info.Name + ' ' + team2Info.Emoji;

        // Build buttons
        const team1Button = new ButtonBuilder()
			.setCustomId('team1Button')
            // .setLabel(team1Info.name)
			.setStyle(ButtonStyle.Secondary)
            .setEmoji(team1Info.emoji);

		const team2Button = new ButtonBuilder()
			.setCustomId('team2Button')
            // .setLabel(team2Info.name)
			.setStyle(ButtonStyle.Secondary)
            .setEmoji(team2Info.emoji);

        const row = new ActionRowBuilder()
        .addComponents(team1Button, team2Button);

        // Send the message and add buttons
        await interaction.reply({content: 'Game posted.', fetchReply: true});
        const message2 = await client.channels.cache.get('1077612967639666738').send({
            content: teamMessage1 + ' vs ' + teamMessage2,
            components: [row],
        });

        const collector = message2.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async i => {
            console.log(i);
            let team = '';
            if (i.customId === 'team1Button') {
                team = team1;
            } else {
                team = team2;
            }
            client.users.cache.get(i.user.id).send(`${i.user.username} voted for ${team}!`);
        });

	},
};
