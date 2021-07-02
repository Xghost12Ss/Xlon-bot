const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'clear',
    description: "clears x amount of messages",
    run: async (bot, message, args) => {

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);
        const guild = bot.guilds.cache.get(message.guild.id);

        if (message.author.bot) return;

        if (message.deletable) {
            message.delete();
        }

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const userPermError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(userPermError)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalAmountError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        const clearEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor('Messages Cleared', message.author.avatarURL())
            .setDescription(`\nUser Cleared: ${message.author}\nAmount Cleared: \`${deleteAmount}\`\nChannel: <#${message.channel.id}>`)
            .setTimestamp()
        var msg = message.channel.bulkDelete(deleteAmount, true).then(await logs.send(clearEmbed))
        let success = await message.channel.send(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} I've deleted \`${deleteAmount}\` messages.`))
        success.delete({ timeout: 14000 });

    }
}