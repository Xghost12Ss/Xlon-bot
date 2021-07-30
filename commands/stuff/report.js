const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'report',
    description: "report a user",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`))
        }

        const staffmail = await message.guild.channels.cache.find(channel => channel.name === `${config.staffMailChannel}`);
        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

        if (message.author.bot) return;

        if (message.deletable) {
            message.delete();
        }

        let mention = message.mentions.members.first();
        let msgArgs = args.slice(1).join(" ");

        if (!msgArgs) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalArgsError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        message.author.send(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} Your report has been sent! The staff team will review the report and get back to you shortly.`)).catch(error => {
            message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} An error occured whilst trying to message you. Might you have DM's disabled?`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        });

        message.reply(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} ${message.author}, check your DM's!`))
            .then(msg => {
                msg.delete({ timeout: 14000 })
            });

        const reportEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`New Report`, message.author.avatarURL())
            .setDescription(`Report by: ${message.author}\nUser Reported: <@${message.mentions.members.first().id}>\nReason: \`${msgArgs}\``)
            .setTimestamp()
        staffmail.send(reportEmbed);

        staffmail.send(`<@&${config.staffRoleId}>, a new report has been received!`)
            .then(msg => {
                msg.delete({ timeout: 1 })
            });

    }
}
