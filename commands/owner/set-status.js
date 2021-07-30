const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'set-status',
    description: "sets status",
    run: async (bot, message, args) => {

        message.delete();

        if (message.author.id === config.ownerId) {

            let command = message.content.substr(1).split(' ')[0];
            const defaultStatus = `Nitron ${config.botVersionShort} | ${config.prefix}help`;
            const defaultPresence = `PLAYING`;

            if (args[0] === "default" || args[0] === "d" || args[0] === "reset") {
                bot.user.setActivity(defaultStatus, { type: defaultPresence });
                const defaultEmbed = new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} The status has been set to: \`${defaultPresence} ${defaultStatus}\``);
                return message.reply(defaultEmbed)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }

            if (args[0] === "remove" || args[0] === "r") {
                bot.user.setActivity(defaultPresence, { type: defaultStatus });
                const removeArg = new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} The status has been removed!`);
                return message.reply(removeArg)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }

            if (args[0] === "streaming" || args[0] === "s") {
                bot.user.setActivity(`Nitron ${config.botVersionShort} | ${config.prefix}help`, {
                    type: "STREAMING",
                    url: "https://www.twitch.tv/axtonprice"
                });
                const done = new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} The status has been set to \`STREAMING\``);
                return message.reply(done)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }

            if (args[0] === "offline" || args[0] === "off") {
                bot.user.setPresence({ status: 'offline' })
                const presenceOff = new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} Presence has been set to \`OFFLINE\``);
                return message.reply(presenceOff)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }

            if (args[0] === "dnd" || args[0] === "d") {
                bot.user.setPresence({ status: 'dnd' })
                const presenceDnd = new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} Presence has been set to \`DO NOT DISTURB\``);
                return message.reply(presenceDnd)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }

            if (args[0] === "online" || args[0] === "on") {
                bot.user.setPresence({ status: 'online' })
                const presenceOn = new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} Presence has been set to \`ONLINE\``);
                return message.reply(presenceOn)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }

            if (!args[0] || !args[1]) {
                const argsError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} You are missing required arguments!`);
                return message.reply(argsError)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }

        } else {
            const perm = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(perm)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

    }
}