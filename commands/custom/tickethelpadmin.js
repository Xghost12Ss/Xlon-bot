const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'tickethelpadmin',
    description: "ticket help command",
    run: async (bot, message, args) => {

        const embed = new Discord.MessageEmbed()
        .setColor(config.color)

        .setTitle('Support Ticket Commands')
        .setDescription(`^newticket | Creates a new support ticket.\n^close | Closes the ticket after 10 seconds.`)

        .setTimestamp()
        .setFooter(config.botName, config.botIcon);

        message.channel.send(embed);
        
    }
}
