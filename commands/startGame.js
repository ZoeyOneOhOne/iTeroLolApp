const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('startgame')
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
        let teamMessage1 = '';
        let teamMessage2 = '';
        let reaction1 = '';
        let reaction2 = '';
        
        // Set up team 1 info
        switch(teamArray[0]){
            case 'Fnatic':
                teamMessage1 = '<:FNC:1014887969808711800>' + ' ' + team1;
                reaction1 = '1014887969808711800';
                break;
            case 'G2 Esports':
                teamMessage1 = '<:G2:1014887970890842233>' + ' ' + team1;
                reaction1 = '1014887970890842233';
                break;
            case 'Team VItality':
                teamMessage1 = '<:VIT:1012762647134994562>' + ' ' + team1;
                reaction1 = '1012762647134994562';
                break;
            case 'Team BDS':
                teamMessage1 = '<:BDS:1014887968512692324>' + ' ' + team1;
                reaction1 = '1014887968512692324';
                break;
            case 'Excel':
                teamMessage1 = '<:XL:1014887979354964059>' + ' ' + team1;
                reaction1 = '1014887979354964059';
                break;
            case 'Astralis':
                teamMessage1 = '<:AST:1014887966331646035>' + ' ' + team1;
                reaction1 = '1014887966331646035';
                break;
            case 'SK Gaming':
                teamMessage1 = '<:SK:1014887976813219942>' + ' ' + team1;
                reaction1 = '1014887976813219942';
                break;
            case 'KOI':
                teamMessage1 = '<:KOI:1065285604578959430>' + ' ' + team1;
                reaction1 = '1065285604578959430';
                break;
            case 'MAD Lions':
                teamMessage1 = '<:MAD:1014887972266578000>' + ' ' + team1;
                reaction1 = '1014887972266578000';
                break;
            case 'Team Heretics':
                teamMessage1 = '<:TH:1065287618939600917>' + ' ' + team1;
                reaction1 = '1065287618939600917';
                break;
            default:
                break;
        }

        //Set up team 2 info
        switch(teamArray[1]) {
            case 'Fnatic':
                teamMessage2 = team2 + ' ' + '<:FNC:1014887969808711800>';
                reaction2 = '1014887969808711800';
                break;
            case 'G2 Esports':
                teamMessage2 =  team2 + ' ' + '<:G2:1014887970890842233>';
                reaction2 = '1014887970890842233';
                break;
            case 'Team VItality':
                teamMessage2 = team2 + ' ' + '<:VIT:1012762647134994562>';
                reaction2 = '1012762647134994562';
                break;
            case 'Team BDS':
                teamMessage2 = team2 + ' ' + '<:BDS:1014887968512692324>';
                reaction2 = '1014887968512692324';
                break;
            case 'Excel':
                teamMessage2 = team2 + ' ' + '<:XL:1014887979354964059>';
                reaction2 = '1014887979354964059';
                break;
            case 'Astralis':
                teamMessage2 = team2 + ' ' + '<:AST:1014887966331646035>';
                reaction2 = '1014887966331646035';
                break;
            case 'SK Gaming':
                teamMessage2 = team2 + ' ' + '<:SK:1014887976813219942>';
                reaction2 = '1014887976813219942';
                break;
            case 'KOI':
                teamMessage2 = team2 + ' ' + '<:KOI:1065285604578959430>';
                reaction2 = '1065285604578959430';
                break;
            case 'Mad Lions':
                teamMessage2 = team2 + ' ' + '<:MAD:1014887972266578000>';
                reaction2 = '1014887972266578000';
                break;
            case 'Team Heretics':
                teamMessage2 = team2 + ' ' + '<:TH:1065287618939600917>';
                reaction2 = '1065287618939600917';
                break;
            default:
                break;
        }

        // Send the message and add rections
        const message = await interaction.reply({content: teamMessage1 + ' vs ' + teamMessage2, fetchReply: true});
        message.react(reaction1);
        message.react(reaction2);
	},
};