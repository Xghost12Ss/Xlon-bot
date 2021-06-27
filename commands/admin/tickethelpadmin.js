const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'tickethelpadmin',
    description: "ticket help command",
    run: async (bot, message, args) => {

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const userPermError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(userPermError)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle('Support Ticket Commands')
            .setDescription(`\`${config.prefix}newticket\` | Creates a new support ticket.\n\`${config.prefix}close\` | Closes the ticket after 10 seconds.\n\`${config.prefix}close -f\` | Closes the ticket immediately`)
            .setTimestamp()
            .setFooter(config.botName, config.botIcon);
        message.channel.send(embed);

    }
}
