const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'unban',
    description: "unbans defined user",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        if (message.deletable) {
            message.delete();
        };

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} This command is not available! Please ask an administrator to manually unban users`))

        //       let msgArgs = args.slice(1).join(" ");
        //       let userID = args[0]
        //
        //       if (!args[0]) {
        //           return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalMentionError}`))
        //               .then(msg => {
        //                   msg.delete({ timeout: 14000 })
        //               })
        //       }
        //
        //       const unbanned = new Discord.MessageEmbed()
        //           .setColor(config.color)
        //           .setAuthor('User Unbanned', message.author.avatarURL())
        //           .setDescription(`\nUnbanned by: ${message.author}\nUser Unbanned: <@${args[0]}>`)
        //           .setTimestamp()
        //       bot.channels.cache.get(config.logsChannel).send(unbanned)
        //
        //       message.guild.fetchBans().then(bans => {
        //           if (bans.size == 0) return
        //           let bUser = bans.find(b => b.user.id == userID)
        //           if (!bUser) return
        //           message.guild.members.unban(bUser.user)
        //       })
        //
        //       message.channel.send(`${config.successEmoji} You have unbanned the user!`) //success
        //           .then(msg => {
        //               msg.delete({ timeout: 14000 })
        //           });

    }
}