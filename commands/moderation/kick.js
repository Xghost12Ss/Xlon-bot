const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');
const db = require('quick.db');

module.exports = {
    name: 'kick',
    description: "kicks defined user",
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
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let kicks = db.get(`kicks_${message.guild.id}_${user.id}`);

        if (message.deletable) {
            message.delete();
        };

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            const userPermError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(userPermError)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        if (!args[0]) {
            const mentionErrorEmbed = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalMentionError}`);
            return message.reply(mentionErrorEmbed)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        if (user) {
            if (user) {

                let msgArgs = args.slice(1).join(" ");

                if (message.deletable) {
                    message.delete();
                }

                if (!msgArgs) {
                    const argErrorEmbed = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalReasonError}`);
                    return message.reply(argErrorEmbed);
                }

                const kickSuccess = new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} You have kicked the user! [${message.mentions.members.first()}]`);
                message.reply(kickSuccess)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });

                const UserEmbed = new Discord.MessageEmbed()
                    .setColor(config.color)
                    .setDescription(`**KICKED FROM SERVER**\n\nYou have been kicked from the ${guild.name} server.\n\nKicked by: ${message.author}\nKick reason: \`${msgArgs}\`\n\nIf you have any questions about your kick, please contact a member of staff.`)
                    .setTimestamp()
                    .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);

                if (kicks === null) { // append to database and send replies
                    db.set(`kicks_${message.guild.id}_${user.id}`, 1)
                    user.send(UserEmbed).catch(error => {
                        logs.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} It seems like I can\'t notify <@${user.id}> of their warning via DM\'s. They may have DM\'s disabled.`))
                    });
                } else if (kicks !== null) {
                    db.add(`kicks_${message.guild.id}_${user.id}`, 1)
                    user.send(UserEmbed).catch(error => {
                        logs.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} An error occurred whilst kicking the user. Please verify the user is still in the server, and that is the correct name`))
                    });
                }

                user.kick().then(() => {

                    if (user.bot) {
                    const kicked = new Discord.MessageEmbed()
                        .setColor(config.color)
                        .setAuthor('User Kicked', message.author.avatarURL())
                        .setDescription(`\nUser Kicked: <@${message.mentions.members.first().id}>\nKicked by: ${message.author}\nReason: \`${msgArgs}\`\n`)
                        .setTimestamp()
                    logs.send(kicked)
                    } else{
                        const kickingBotError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} You cannot kick bots, as it causes internal errors. To remove the bot from your server, please manually kick it.`);
                        return message.reply(kickingBotError);
                    }

                }).catch(err => {
                    const error1 = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The user specified does not appear to be in the server!`);
                    message.reply(error1)
                        .then(msg => {
                            msg.delete({ timeout: 14000 })
                        });
                    console.log(err);
                });
            } else {
                const error2 = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The user specified does not appear to be in the server!`);
                message.reply(error2)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }
        } else {
            const error3 = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} An error occurred whilst kicking that user. Please verify the user is still in the server, and that is the correct name?`);
            message.reply(error3)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }
    }
}