const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const { getTeams, castVote, addGame, seriesVote, logError, getTeamEmoji } = require('../db');

// Set up roles
// const acceptedRoles = ['Founder', 'The Board', 'Community Manager', 'Staff', 'Deputy Mods', 'BotMaster'];
// const acceptedRoleIDs = ['761266506235379712', '761266861115441162', '1004747752980353084', '1029408764899635211', '1061776397091209387', '1077611324793688094'];

const collectorMap = new Map();

// Function to create series buttons
function createSeriesButtons(series) {
    const buttons = [];

    for (let i = 2; i <= series; i++) {
        buttons.push(new ButtonBuilder()
            .setCustomId(`button${i}`)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(`${i}️⃣`)
        );
    }

    return buttons;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('addgame')
		.setDescription('Sets up a game for placing bets.')
        .addStringOption(option =>
            option.setName('team1')
                .setDescription('Team 1')
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
            option.setName('team2')
                .setDescription('Team 2')
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

         const message2 = await interaction.client.channels.cache.get('1162487828417085650').send({
             content: teamMessage1 + ' vs ' + teamMessage2,
             components: [row],
         });

         await addGame(team1, team2, series, message2.id);

         // Send the message and add buttons
         await interaction.reply({content: 'Game posted.' + team1Info.Emoji + ' ' + team2Info.Emoji + ' : ' + message2.id, fetchReply: true});

         const collector = message2.createMessageComponentCollector({ componentType: ComponentType.Button, time: 172800000 });

         collectorMap.set(message2.id, collector);



         collector.on('collect', async i => {
            // Get the collector associated with the message using message ID
            const messageCollector = collectorMap.get(i.message.id);

            try {
        
                if (i.customId === 'team1Button' || i.customId === 'team2Button') {

                    const seriesButtons = createSeriesButtons(parseInt(series));
                    const seriesRow = new ActionRowBuilder().addComponents(...seriesButtons);
                    const team = await getTeamEmoji(i.message.id, i.customId);
    
                    await castVote(team.name, i.user.username, i.message.id).then(() => {
                        i.reply({ 
                            content: "Vote for " + team.emoji + " submitted.", 
                            components: [seriesRow],
                            ephemeral: true });
                    });

                } else if (i.customId.startsWith('button')) {
                    console.log('We got here');
                    // Handle series vote when series buttons are clicked
                    const seriesLength = i.customId.replace('button', ''); // Extract the series length from the customId
                    console.log(seriesLength);
                    try {
                        await seriesVote(seriesLength, i.user.username, i.message.id).then(() => {
                            i.reply({ 
                                content: `Vote for ${seriesLength} games submitted.`, 
                                ephemeral: true });
                        });
                    } catch (error) {
                        console.error("Error submitting series vote:", error);
                        logError(error, i.message.id, i.user.username, 'Error submitting series vote');
                    }
                }

        } catch (error) {
            console.error("Button interaction error:", error);
            console.log("Interaction Object:", i);
            console.log("Button interaction user: ", i.user.username);
            console.log("Button interaction messageID: ", i.message.id);
            logError(error, i.message.id, i.user.username, 'Button interaction error: ' + i);
        }
        });
	},
};
