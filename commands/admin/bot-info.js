const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'bot-info',
    description: "Help command",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const userPermError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(userPermError)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        const infoEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`Advanced Bot Info`, message.author.avatarURL())
            .setDescription(`Displays advanced information about the bot\n`)
            .addFields(
                //New line{ name: '\u200B', value: '\u200B' },
                { name: 'Bot Version:', value: `${config.botVersion}`, inline: true },

                { name: 'Bot Name:', value: `${config.botName}`, inline: true },

                { name: 'Bot Hex Color:', value: `-${config.color}`, inline: true },

                { name: 'Bot Owner:', value: `${config.ownerName}`, inline: true },

                { name: 'Presence:', value: `${bot.presence.status}`, inline: true },

                { name: 'Bot ID:', value: `${config.botId}`, inline: true },

            )
            .setTimestamp()
        message.channel.send(infoEmbed);

    }

}
