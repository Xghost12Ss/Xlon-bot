const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');
const db = require('quick.db');

module.exports = {
    name: 'warn',
    description: "warns the user",
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
        const user = message.mentions.members.first();

        if (message.deletable) {
            message.delete();
        };

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        if (user.bot) {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} You cannot warn bots!`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        if (message.author.id === user.id) {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} You cannot warn yourself!`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
        let msgArgs = args.slice(1).join(" ");

        if (!msgArgs) {
            return message.channel.send()
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        if (warnings === 3) {
            const warningsEmbed1 = new Discord.MessageEmbed().setColor(config.color).setDescription(`${user.username} has already reached their limit with 3 warnings!`);
            return message.reply(warningsEmbed1);
        }

        const UserEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(`**${guild.name}**\n\nYou have been warned in the ${guild.name} server.\n\nWarned by: ${message.author}\nWarning reason: \`${msgArgs}\`\n\nPlease make sure to read the rules. If you have any questions about your warning, please contact a member of staff.`)
            .setTimestamp()
            .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
        //

        if (warnings === null) { // append to database and send replies

            db.set(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(UserEmbed).catch(error => {
                logs.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} It seems like I can\'t notify <@${user.id}> of their warning via DM\'s. They may have DM\'s disabled.`))
            });

        } else if (warnings !== null) {

            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(UserEmbed).catch(error => {
                logs.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} It seems like I can\'t notify <@${user.id}> of their warning via DM\'s. They may have DM\'s disabled.`))
            });

        }

        user.send(UserEmbed).catch(error => {
            logs.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} It seems like I can\'t notify <@${user.id}> of their warning via DM\'s. They may have DM\'s disabled.`))
        });

        message.channel.send(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} You have warned the user! [${user}]`))
            .then(msg => {
                msg.delete({ timeout: 14000 })
            });

        const warnEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`User Warned`, message.author.avatarURL())
            .setDescription(`\nWarn by: <@${message.author.id}>\nReason: \`${msgArgs}\`\nUser Warned: <@${user.id}>`)
            .setTimestamp()
        logs.send(warnEmbed)


    }
}