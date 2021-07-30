const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'ff01kmec',
    description: "makes bot leave server",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId) {

            message.channel.send("Goodbye");
            message.guild.leave();

        } else {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`)).then(m => m.delete(5000));
        }

    }
}