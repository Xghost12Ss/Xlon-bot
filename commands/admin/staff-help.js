const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'staff-help',
    description: "staff help command",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const helpEmbed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(`:clipboard: ALL STAFF COMMANDS :clipboard:`, message.author.avatarURL({ dynamic: true }))
        .setDescription(`The currenty prefix is set to \`${config.prefix}\`, you can use this before the command to execute it. For example: \`${config.prefix}help\`.\n\n`)
        .addFields(
            { name: 'Bot Commands', value: `\`\`\`${config.prefix}setup \n${config.prefix}help \n${config.prefix}bot-info\n\`\`\``, inline: true },
            
            { name: 'Moderation Commands', value: `\`\`\`${config.prefix}warn user reason \n${config.prefix}ban user reason \n${config.prefix}unban user (UNAVAILABLE) \n${config.prefix}kick user reason\n${config.prefix}mute user \n${config.prefix}unmute user\`\`\``, inline: true })
        .setTimestamp()
        .setFooter(config.botName, config.botIcon);
        message.channel.send(helpEmbed);
        
    }
}
