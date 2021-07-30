const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'lockdown/lift',
    description: "removes server lockdown",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

        if (message.author.bot) return;

        if (message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            const userPermError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(userPermError)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        const guild = bot.guilds.cache.get(message.guild.id);
        let everyone = guild.roles.everyone.id;

        message.channel.overwritePermissions([{ id: everyone, allow: ["SEND_MESSAGES"] }]);

        //Messages
        message.channel.send(new Discord.MessageEmbed().setColor(config.color).setDescription(`🔓 This channel is no longer under lockdown! You may continue chatting!`));

        const lockdownLiftEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor('Lockdown Lifted 🔓', message.author.avatarURL())
            .setDescription(`\nLifted By: ${message.author}\nChannels Affected: <#${message.channel.id}> `)
            .setTimestamp()
        logs.send(lockdownLiftEmbed)

    }
}