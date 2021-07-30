const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'count-stats',
    description: "counts live stats",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId || message.author.id === "610080404908539914") {

            const totalUsers = bot.users.cache.size;
            const totalChannels = bot.channels.cache.size;
            const totalServers = bot.guilds.cache.size;

            const finalEmbed = new Discord.MessageEmbed().setAuthor(`Statistics Counter`, message.author.avatarURL({ dynamic: true })).setColor(config.color).setDescription(`Total users: \`${totalUsers}\`\nTotal Channels: \`${totalChannels}\`\nTotal Servers: \`${totalServers}\``);
            message.reply(finalEmbed);

        }

    }
}