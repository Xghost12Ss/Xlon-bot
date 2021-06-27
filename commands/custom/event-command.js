const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'event',
    description: "Event command",
    run: async (bot, message, args) => {

        const eventEmbed = new Discord.MessageEmbed ()
        .setColor(config.color)
        .setDescription(`**Upcoming Community Event**\n________________________\n\nThere is no Upcoming Events\n\n You will be notified when there is an event!\n\n **Form:**\n________________________\n\n **Date: **TBC\n**Time: **TBC `) 
        .setThumbnail("https://cdn.discordapp.com/attachments/772860315150974998/801386140472967168/circlelogo.png")
        .setFooter(config.botName, config.botIcon);
        message.channel.send(eventEmbed);
    }
}