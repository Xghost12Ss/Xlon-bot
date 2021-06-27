const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');
const db = require('quick.db');

module.exports = {
    name: 'infractions',
    description: "displays a users infractions",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const user = message.mentions.members.first() || message.author;
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
        let kicks = db.get(`kicks_${message.guild.id}_${user.id}`);

        if (warnings === null) warnings = 0;

        if (warnings === 1) {
            const warningsEmbed1 = new Discord.MessageEmbed().setColor(config.color).setDescription(`**${user}** has **${warnings}** warning and **${kicks}**`);
            message.reply(warningsEmbed1);
        } else{
            const warningsEmbed2 = new Discord.MessageEmbed().setColor(config.color).setDescription(`**${user}** has **${warnings}** warnings and **${kicks}**`);
            message.reply(warningsEmbed2);
        }


    }
}