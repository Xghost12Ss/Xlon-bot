const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'list-servers',
    description: "lists servers",
    run: async (bot, message, args) => {

        message.delete();

        if (message.author.id === config.ownerId || message.author.id === "610080404908539914") {

            console.log(``);
            console.log(``);
            bot.guilds.cache.forEach(guild => {
                console.log(`${guild.name} - ${guild.id}`);
            })

        }

    }
}