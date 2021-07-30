const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'ban',
    description: "bans defined user",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

        if (message.author.bot) return

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            const userPermError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(userPermError)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        let msgArgs = args.slice(1).join(" ");
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalMentionError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const banned = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor('User Banned', message.author.avatarURL())
            .setDescription(`\nBanned by: ${message.author}\nUser Banned: <@${message.mentions.members.first().id}>\nReason: \`${msgArgs}\`\n`)
            .setTimestamp()
        if (logs) logs.send(banned);

        const UserEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(`**BANNED FROM SERVER**\n\nYou have been banned from the ${guild.name} server.\n\nBanned by: ${message.author}\nBan reason: \`${msgArgs}\`\n\nIf you have any questions about your ban, or would like to submit an appeal please contact a member of staff.`)
            .setTimestamp()
            .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
        message.mentions.members.first().send(UserEmbed);

        message.guild.members.ban(user)

        message.channel.send(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} You have banned the user! [${message.mentions.members.first()}]`))
            .then(msg => {
                msg.delete({ timeout: 14000 })
            });

    }
}