const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'temp-ban-a-a-a-a-a-e',
    description: "temp bans user",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

        if (message.deletable) {
            message.delete();
        };

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            const userPermError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(userPermError)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        var user = message.guild.member(message.mentions.users.first());
        var tempBanTime = args[1];
        var reason = args.join(" ").slice(22);

        if (!user) return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalMentionError}`)) // no user mentioned 
            .then(msg => {
                msg.delete({ timeout: 14000 })
            });

        if (!reason) return message.channel.send(`${config.failureEmoji} ${messages.globalReasonError}`) // no reason given
            .then(msg => {
                msg.delete({ timeout: 14000 })
            });

        if (ms(tempBanTime)) {

            await message.guild.member(user).ban(reason);
            message.channel.send(`${user} was banned for ${reason}`);

            setTimeout(function () { // Unban user after certain time is up
                message.guild.unban(user.id);
                message.channel.send(`${user} has been unbanned`)
            }, ms(tempBanTime))

        } else {
            return message.channel.send(`${config.failureEmoji} Please provide a valid length of time to temp-ban!`) //error
        }

    }
}
