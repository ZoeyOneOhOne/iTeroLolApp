const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addgame')
		.setDescription('Sets up a game for placing bets.')
        .addStringOption(option =>
            option.setName('team1')
                .setDescription('Team 1')
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
                    { name: 'Team Heretics', value: 'Team Heretics' },))
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
		const message = await interaction.reply({ content: '<:FNC:1014887969808711800>' + ' ' + team1 + ' vs ' + team2 + '<:G2:1014887970890842233>', fetchReply: true });
        if(teamArray.includes('Fnatic')) {
            message.react('1014887969808711800');
        }
        if(teamArray.includes('G2 Esports')) {
            message.react('1014887970890842233')
        }
        if(teamArray.includes('Team VItality')) {
            message.react('1012762647134994562');
        }
        if(teamArray.includes('Team BDS')) {
            message.react('1014887968512692324');
        }
        if(teamArray.includes('Excel')) {
            message.react('1014887979354964059');
        }
        if(teamArray.includes('Astralis')) {
            message.react('1014887966331646035');
        }
        if(teamArray.includes('SK Gaming')) {
            message.react('1014887976813219942');
        }
        if(teamArray.includes('KOI')) {
            message.react('1065285604578959430');
        }
        if(teamArray.includes('MAD Lions')) {
            message.react('1014887972266578000');
        }
        if(teamArray.includes('Team Heretics')) {
            message.react('1065287618939600917');
        }
	},
};