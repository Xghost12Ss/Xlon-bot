const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'ping',
    description: "pings the bot",
    run: async (bot, message, args) => {

        var yourping = new Date().getTime() - message.createdTimestamp
        const apiPing = Math.round(message.client.ping); // This will round the api ping of the client
        const responseTime = Math.round(message.createdTimestamp - Date.now()); // This will round the response time between when the message was received and when the message was sent
        const ping = message.createdTimestamp - Date.now();

        let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        let msg = await message.reply(`${config.loadingEmoji}  Pinging..`)

        const pingEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle('Pong!')
            .setDescription(`Bots ping: \`${ping}ms\`\nUptime: \`${uptime}\``)
            .setTimestamp()
        message.reply(pingEmbed)

        msg.delete()

    }
}