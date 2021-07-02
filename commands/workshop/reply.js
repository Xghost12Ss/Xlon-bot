const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'reply',
    description: "joins a voice channel",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId) {

            const helloEmbed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle(`Inline Replies`, message.author.avatarURL({ dynamic: true }))
                .setDescription(`Hello there!`)
                .setTimestamp()
                .setFooter(config.botName, config.botIcon);
            message.reply(helloEmbed)

        }

    }
}