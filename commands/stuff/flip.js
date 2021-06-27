const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'flip',
    description: "flips coin",
    run: async (bot, message, args) => {

        const headsEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(`:game_die: Heads!`)

        const tailsEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(`:game_die: Tails!`)

        const isHeads = Math.random() > 0.5;
        isHeads
            ? message.channel.send(headsEmbed)
            : message.channel.send(tailsEmbed);

    }
}
