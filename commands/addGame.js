const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const { getTeams, castVote, addGame, seriesVote } = require('../db');
const { collectorMap } = require('../collectorManager');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
client.login(token);

// Set up roles
// const acceptedRoles = ['Founder', 'The Board', 'Community Manager', 'Staff', 'Deputy Mods', 'BotMaster'];
// const acceptedRoleIDs = ['761266506235379712', '761266861115441162', '1004747752980353084', '1029408764899635211', '1061776397091209387', '1077611324793688094'];

// Function to check if two arrays have common elements
// function hasCommonElement(arr1, arr2) {
//     for (const element of arr1) {
//         if (arr2.includes(element)) {
//             return true;
//         }
//     }
//     return false;
// }

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
                ))
        .addStringOption(option =>
            option.setName('series')
                .setDescription('Number of games')
                .setRequired(true)
                .addChoices(
                    { name: '1', value: '1'},
                    { name: '3', value: '3'},
                    { name: '5', value: '5'},
                )),
	async execute(interaction) {
        // Set up team information
        const teamList = await getTeams();
        const team1 = interaction.options.getString('team1');
        const team2 = interaction.options.getString('team2');
        const teamArray = [team1, team2];
        let teamMessage1 = '';
        let teamMessage2 = '';
        const team1Info = teamList.find(team => team.Name === teamArray[0]);
        const team2Info = teamList.find(team => team.Name === teamArray[1]);
        teamMessage1 = team1Info.Emoji + ' ' + team1Info.Name;
        teamMessage2 = team2Info.Name + ' ' + team2Info.Emoji;

        const series = interaction.options.getString('series');

        // Build buttons
        const team1Button = new ButtonBuilder()
			.setCustomId('team1Button')
			.setStyle(ButtonStyle.Secondary)
            .setEmoji(team1Info.Emoji);

		const team2Button = new ButtonBuilder()
			.setCustomId('team2Button')
			.setStyle(ButtonStyle.Secondary)
            .setEmoji(team2Info.Emoji);

        const row = new ActionRowBuilder()
        .addComponents(team1Button, team2Button);

        // Build button for series

        if(series === '3') {
            const button2 = new ButtonBuilder()
			.setCustomId('button2')
			.setStyle(ButtonStyle.Secondary)
            .setEmoji("2️⃣");

            const button3 = new ButtonBuilder()
                .setCustomId('button3')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("3️⃣");
            
            row.addComponents(button2, button3);
        } else if (series === '5') {
            const button3 = new ButtonBuilder()
                .setCustomId('button3')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("3️⃣");

            const button4 = new ButtonBuilder()
                .setCustomId('button4')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("4️⃣");

            const button5 = new ButtonBuilder()
                .setCustomId('button5')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("5️⃣");

            row.addComponents(button3, button4, button5);
        }

         // Send the message and add buttons
         await interaction.reply({content: 'Game posted.' + team1Info.Emoji + ' ' + team2Info.Emoji, fetchReply: true});
         const message2 = await client.channels.cache.get('1077612967639666738').send({
             content: teamMessage1 + ' vs ' + teamMessage2,
             components: [row],
         });

         await addGame(team1, team2, message2.id);

         const collector = message2.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

         collector.on('collect', async i => {
             let team = '';
             if (i.customId === 'team1Button') {
                 team = team1;
                 await castVote(team, i.user.username, i.message.id).then(() => {
                    client.users.cache.get(i.user.id).send(`${i.user.username} voted for ${team}!`);
                })
             } else if (i.customId === 'team2Button') {
                 team = team2;
                 await castVote(team, i.user.username, 3, i.message.id).then(() => {
                    client.users.cache.get(i.user.id).send(`${i.user.username} voted for ${team}!`);
                })
             } else if (i.customId === 'button2') {
                await seriesVote('2', i.user.username, i.message.id).then(() => {
                    client.users.cache.get(i.user.id).send(`${i.user.username} voted for 2 games in the series!`);
                })
             } else if (i.customId === 'button3') {
                await seriesVote('3', i.user.username, i.message.id).then(() => {
                    client.users.cache.get(i.user.id).send(`${i.user.username} voted for 3 games in the series!`);
                })
             } else if (i.customId === 'button4') {
                await seriesVote('4', i.user.username, i.message.id).then(() => {
                    client.users.cache.get(i.user.id).send(`${i.user.username} voted for 4 games in the series!`);
                })
             } else if (i.customId === 'button5') {
                await seriesVote('5', i.user.username, i.message.id).then(() => {
                    client.users.cache.get(i.user.id).send(`${i.user.username} voted for 5 games in the series!`);
                })
             }
         });
         collectorMap.set(message2.id, collector);
	},
};
