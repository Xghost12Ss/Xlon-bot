const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'load',
    description: "loading animation",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId) {

        message.delete();
        let msg1 = await message.channel.send(new Discord.MessageEmbed().setColor(config.color).setDescription(`${config.loadingEmoji} ${messages.globalProcessing}`))
        
    } else {
        return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`)).then(m => m.delete(5000));
    }

    }
}