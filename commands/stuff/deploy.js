const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'update',
    description: "deploy",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`))
        }

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`))
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        };

        message.delete();
        message.reply(new Discord.MessageEmbed().setColor(config.successColor).setDescription(`${config.successEmoji} Bot updated to version \`${config.botVersion}\` [\`${config.botId}\`]`));

    }
}
