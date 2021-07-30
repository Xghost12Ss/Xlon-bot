const Discord = require('discord.js');
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: "close",
    description: "closes the ticket",
    run: async (bot, message, args) => {
        
        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);
        const guild = bot.guilds.cache.get(message.guild.id);

        if (message.author.bot) return

        if (message.guild == null) return message.channel.send(`${config.failureEmoji} ${messages.ticketNoServerError}`)
        if (message.channel.name.includes(`ticket`) || message.channel.name.includes("appli") || message.channel.name.includes("support")) {
            if (args == '-f') {
                message.channel.delete("Ticket Closed");

                const log1Embed = new Discord.MessageEmbed()
                    .setColor(config.color)
                    .setAuthor('Ticket Forcibly Closed', message.author.avatarURL())
                    .setDescription(`\nForcibly Closed by: \`${message.author.username}\``)
                    .setTimestamp()

                logs.send(log1Embed)

                return;
            }
            message.channel.send(new Discord.MessageEmbed().setDescription(`${messages.ticketClosing}`).setColor(config.color).setFooter(message.author.username, message.author.avatarURL())).then((message) => {
                let collector = message.channel.createMessageCollector(m => {
                    return true
                }, {
                    time: 1000 * 10
                })
                collector.on('end', collected => {
                    if (collected.size != 0) {
                        message.channel.send(new Discord.MessageEmbed().setDescription(`${messages.ticketCancelled}`).setColor(config.color).setFooter(message.author.username, message.author.avatarURL()))
                    } else {
                        message.channel.delete()

                        const log2Embed = new Discord.MessageEmbed()
                            .setColor(config.color)
                            .setAuthor('Ticket Closed', message.author.avatarURL())
                            .setDescription(`\nClosed by: \`${message.author.username}\``)
                            .setTimestamp()

                        logs.send(log2Embed)
                    }
                });
            })
        } else {
            message.channel.send(new Discord.MessageEmbed().setDescription(`${config.failureEmoji} ${messages.ticketChannelError}`).setColor(config.color).setFooter(message.author.username, message.author.avatarURL()))
        }
    }
}