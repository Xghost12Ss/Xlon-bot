const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'type',
    description: "starts typing",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId) {

            message.channel.startTyping();

        } else {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`)).then(m => m.delete(5000));
        }

    }
}