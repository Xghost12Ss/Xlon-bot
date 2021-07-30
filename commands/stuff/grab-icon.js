const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'icon',
    description: "grabs user icon",
    run: async (bot, message, args) => {

        const user = message.mentions.members.first() || message.author;

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`))
        }

        const finalEmbed = new Discord.MessageEmbed().setColor(config.color).setDescription(`[Click here](${user.user.displayAvatarURL({ dynamic: true })}) to view ${user}'s icon`).setImage(user.user.displayAvatarURL({ dynamic: true }));
        message.reply(finalEmbed);

    }
}
