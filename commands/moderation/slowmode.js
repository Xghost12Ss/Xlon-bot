const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'slowmode1-f-sd-f-sd-5-sd5-5',
    description: "sets channel slowmode",
    run: async (bot, message, args) => {

        let msgArgs = args.slice(1).join(" ");

        setRateLimitPerUser(msgArgs[1], msgArgs[2])
        return message.channel.send(`I have set slowmode to \`${msgArgs}\` for <#${message.channel.id}>`);

    }
}