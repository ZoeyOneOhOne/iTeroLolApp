const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');

const collectorMap = new Map();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buttontest')
		.setDescription('Testing buttons')
        .addStringOption(option => 
            option.setName('button1')
                .setDescription('Button 1')
                .setRequired(true)
        ).addStringOption(option => 
            option.setName('button2')
                .setDescription('Button 2')
                .setRequired(true)
        ),

        async execute(interaction) {
            const channelId = '1077612967639666738'; 
        
            const channel = interaction.client.channels.cache.get(channelId);
        
            if (!channel) {
                console.error(`Channel with ID ${channelId} not found.`);
                return;
            }
        
            const button1 = new ButtonBuilder()
                .setCustomId('button1')
                .setStyle(ButtonStyle.Secondary)
                .setLabel(interaction.options.getString('button1'))
        
            const button2 = new ButtonBuilder()
                .setCustomId('button2')
                .setStyle(ButtonStyle.Secondary)
                .setLabel(interaction.options.getString('button2'))
        
            const row = new ActionRowBuilder()
                .addComponents(button1, button2);
        
            try {
                const message = await channel.send({
                    content: 'Vote on one of these',
                    components: [row],
                });

                await interaction.reply({content: 'Posted', fetchReply: true});
        
                const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 172800000 });
        
                collectorMap.set(message.id, collector);
        
                collector.on('collect', async i => {
                    // Get the collector associated with the message using message ID
                    const messageCollector = collectorMap.get(i.message.id);
    
                    if (i.customId === 'button1') {
                        i.reply({ content: "Vote for button 1 submitted.", ephemeral: true });
                    } else if (i.customId === 'button2') {
                        i.reply({ content: "Vote for button 2 submitted.", ephemeral: true });
                    }
                });
    
                collector.on('end', collected => {
                    // Remove the collector from the map when it ends
                    collectorMap.delete(message.id);
                });

            } catch (error) {
                console.error('Error sending the message:', error);
            }
        },
};