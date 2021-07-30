const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'mail',
    description: "sends mail to mod mail channel",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`))
        }

        const staffmail = await message.guild.channels.cache.find(channel => channel.name === `${config.staffMailChannel}`);
        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

        message.delete();

        let msgArgs = args.slice(0).join(" ");

        if (!msgArgs) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalMessageError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        message.author.send(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} Your message has been sent! The staff team will get back to you as soon as possible.`)).catch(error => {
            message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} An error occured whilst trying to message you. Might you have DM's disabled?`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        });

        message.reply(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} ${message.author}, check your DM's!`))
            .then(msg => {
                msg.delete({ timeout: 14000 })
            });

        const mail = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`New Mail Received`, message.author.avatarURL())
            .setDescription(`:mailbox_with_mail: ${message.author} says:\n"\`${msgArgs}\`"`)
            .setTimestamp()
        staffmail.send(mail);

        staffmail.send(`<@everyone>, new mail has been received! If you are reading this, this message will be deleted shortly.`)
            .then(msg => {
                msg.delete({ timeout: 1 })
            });

    }
}