const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'cake',
    description: "gives a cake",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        // perms checks
        if (message.author.id === config.ownerId ||
            message.member.roles.cache.find(r => r.name === "VIP") ||
            message.member.roles.cache.find(r => r.name === "Friends") ||
            message.member.roles.cache.find(r => r.name === "Pals") ||
            message.member.roles.cache.find(r => r.name === "Friend") ||
            message.member.roles.cache.find(r => r.name === "Homie") ||
            message.member.roles.cache.find(r => r.name === "Friends") ||
            message.member.roles.cache.find(r => r.name === "Homies") ||
            message.member.roles.cache.find(r => r.name === "Exclusive")) {
        // perm checks

            let mention = message.mentions.members.first();
            let msgArgs = args.slice(1).join(" ");

            message.react(config.successEmoji)
            message.channel.send(new Discord.MessageEmbed().setColor(config.color).setImage(`https://bit.ly/3chw4Mq`).setDescription(`${message.author} just got free cake! :cake:`));

        } else { // Perm check
            message.react(config.failureEmoji)
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failureColor).setDescription(`${config.failureEmoji} You must be a VIP to use this command!`));
        }

    }
}
