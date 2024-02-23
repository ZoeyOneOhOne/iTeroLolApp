const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { getTeams, castVote, addGame, logError, getTeamEmoji } = require('../db');
const { retryOperation } = require('../retry');

// Set up roles
// const acceptedRoles = ['Founder', 'The Board', 'Community Manager', 'Staff', 'Deputy Mods', 'BotMaster'];
// const acceptedRoleIDs = ['761266506235379712', '761266861115441162', '1004747752980353084', '1029408764899635211', '1061776397091209387', '1077611324793688094'];


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

         await addGame(team1, team2, message2.id);

         // Send the message and add buttons
         await interaction.reply({content: 'Game posted.' + team1Info.Emoji + ' ' + team2Info.Emoji + ' : ' + message2.id, fetchReply: true});

        // Directly handle interactions without using a collector
        interaction.client.on("interactionCreate", async (i) => {
            if (!i.isButton()) return;

            let team; 

            try {
                if (i.customId === 'team1Button' || i.customId === 'team2Button') {
                    // Handle team vote with retry mechanism
                    await retryOperation(async () => {
                        team = await getTeamEmoji(i.message.id, i.customId); // Assign value to team variable
                        await castVote(team.name, i.user.username, i.message.id);
                    }, 3, i.message.id, i.user.username); // Retry team vote operation up to 3 times

                    // Reply to interaction
                    await i.reply({
                        content: `Vote for ${team.emoji} submitted.`,
                        ephemeral: true,
                    });
                }
            } catch (error) {
                console.error("Interaction handling error:", error);
                logError(error, i.message.id, i.user.username, 'Interaction handling error: ' + i);
            }
        });


	},
};
