const { SlashCommandBuilder } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
client.login(token);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('esports3')
		.setDescription('Sends the esports3 message'),
	async execute(interaction) {
        await interaction.reply({content: 'Message sent.', fetchReply: true});
        const message = '<@&1074582889901068288>' + '\n' + '\n' + 
        'If  you would like to participate in our Esports Predictions, and have a chance to win LoL skins, react to each above message with the logo of the team you predict to win the game. Once you see a <:rammus_ok:1086474462834200687> reaction on the game, picks are locked in, and any additional votes will not be taken into account. For each correct prediction, you will receive a point on the leaderboard. The winner of predictions at the end of each Split or Tournament will win a free LoL Skin (EU/NA Servers only).' + '\n' +
        '\n' +
        'Since these matches are a 5 game series, you can receive a bonus point if you correctly predict the winner AND how many games the series will go (:three:, :four: or :five:). ' + '\n' + '\n' +
        'If you would like to receive pings when predictions are  posted, you can go to <id:customize> to be added to the Esports Predictors role.';
        client.channels.cache.get('1077612967639666738').send(message);
	},
};