const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'stoptype',
    description: "stops typing",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId) {
            message.channel.stopTyping();
   
        } else {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`)).then(m => m.delete(5000));
        }

    }
}