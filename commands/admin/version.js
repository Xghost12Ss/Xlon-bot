const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'ver',
    description: "version info",
    run: async (bot, message, args) => {

        const version = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`Current Version`, message.author.avatarURL())
            .setDescription(`${config.botVersion}, ${config.botId}`)
        message.channel.send(version)

    }
}
