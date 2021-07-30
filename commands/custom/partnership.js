const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'partnership',
    description: "partnership request",
    run: async (bot, message, args) => {

        message.delete();

        let msgArgs = args.slice(0).join(" ");

        message.author.send(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} ${messages.staffMailSuccess}`)).catch(error => {
            message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} An error occured whilst trying to message you. Might you have DM's disabled?`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        });

        message.channel.send(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} ${message.author}, check your DM's!`))
            .then(msg => {
                msg.delete({ timeout: 14000 })
            });

        if (!msgArgs) {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalMessageError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        const mail = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`New Partnership Request`, message.author.avatarURL())
            .setDescription(`:mailbox_with_mail: ${message.author} requested partnership with the following statistics:\n"\`${msgArgs}\`"`)
            .setTimestamp()
        bot.channels.cache.get(config.staffMailChannel).send(mail)

        bot.channels.cache.get(config.staffMailChannel).send(`<@&807189841354948608>, a new partnership request has been received! If you are reading this, this message will be deleted shortly.`)
        .then(msg => {
            msg.delete({ timeout: 1 })
        });

    }
}
