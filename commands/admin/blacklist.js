const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'blacklist',
    description: "blacklisted words",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        var profanities = require('../../profanities.json');

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(`${config.failureEmoji} ${messages.globalPermError}`).then(m => m.delete(5000));
        }

        const blacklistwords = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(`**Blacklisted Words**\n*${config.alertEmoji} Warning: Contains sensitive language some may find offensive ${config.alertEmoji}*\n\nHeadsup: Due to JSON formatting, there is no space between each word\n\n||${profanities.profanities}||\n*↑↑ Click to reveal ↑↑*`)
            .setTimestamp()
        message.reply(blacklistwords)

    }
}
