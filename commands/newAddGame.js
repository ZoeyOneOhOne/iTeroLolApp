const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const { teamList } = require('../teamList');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
client.login(token);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newaddgame')
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
        const team1 = interaction.options.getString('team1');
        const team2 = interaction.options.getString('team2');
        const teamArray = [team1, team2];
        let teamMessage1 = '';
        let teamMessage2 = '';
        const team1Info = teamList.find(team => team.name === teamArray[0]);
        const team2Info = teamList.find(team => team.name === teamArray[1]);
        teamMessage1 = team1Info.emoji + ' ' + team1Info.name;
        teamMessage2 = team2Info.name + ' ' + team2Info.emoji;

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

        const collector = message2.createMessageComponentCollector({ componentType: ComponentType.Button, time: 3_600_000 });

        collector.on('collect', async i => {
            console.log(i);
            let team = '';
            if (i.customId === 'team1Button') {
                team = team1;
            } else {
                team = team2;
            }
            await i.reply(`${i.user.username} voted for ${team}!`);
        });
	},
};
