const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');
let trust;

const { DRepClient } = require('@aero/drep');
const drep = new DRepClient('D-REP.QG2FR3MR0RZH8K5Y50OZ5KMG75A.LD8N5SOR1X09RFQEEI20EHGRI4YQ6W');

module.exports = {
    name: 'user-info',
    description: 'user info',
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`))
        }

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);
        let loading = await message.reply(new Discord.MessageEmbed().setColor(config.color).setDescription(`${config.loadingEmoji} ${messages.globalProcessing}`))

        if (!args[0]) {
            loading.delete();
            return message.reply(new Discord.MessageEmbed().setColor("#FF0000").setDescription(`${config.failureEmoji} ${messages.globalMentionError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        const moment = require('moment');
        const user = message.mentions.users.first() || message.author;
        var member = message.mentions.members.first();
        let userinfoget = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.member(message.author)
        const response = await drep.rep(message.mentions.users.first().id);
        isBotCheck = message.author.bot;

        const userinfo = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`${user.username} [${message.mentions.users.first().id}]`, `${user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`Username: \`${user.tag}\`\nUser ID: \`${message.mentions.users.first().id}\`\nIcon: [[Click Here](${user.displayAvatarURL({ dynamic: true })})]\n\Bot: \`${message.mentions.users.first().bot}\`
            Last Joined Server: \`${moment(userinfoget.joinedAt).format('LLLL')}\`\nAccount Created: \`${moment(userinfoget.user.createdAt).format('LLLL')}\`\n\nHighest Role:\n ${member.roles.highest}\n
            Trust XP: \`${response.xp}\`\nTrust Upvotes: \`${response.upvotes}\`\nTrust Downvotes: \`${response.downvotes}\`\n__\nVote for this user at: [https://discordrep.com/u/${message.mentions.users.first().id}]`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        message.reply(userinfo);

        loading.delete();

        const logEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`User Info Request`, message.author.avatarURL())
            .setDescription(`\nRequested by: <@${message.author.id}>\nUser Requested: ${message.mentions.members.first()}\nChannel: <#${message.channel.id}>`)
            .setTimestamp()
        logs.send(logEmbed)

    }
}