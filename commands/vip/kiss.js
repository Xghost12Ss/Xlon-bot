const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'kiss',
    description: "kisses a user with anime gif",
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

            if (!args[0]) {
                return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalMentionError}`))
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    });
            }

            let mention = message.mentions.members.first();
            let msgArgs = args.slice(1).join(" ");

            const gifs = [
                'https://media.giphy.com/media/11rWoZNpAKw8w/giphy.gif',
                'https://media.giphy.com/media/dj7V210SR2UBG/giphy.gif',
                'https://media.giphy.com/media/QGc8RgRvMonFm/giphy.gif',
                'https://media.giphy.com/media/WynnqxhdFEPYY/giphy.gif',
                'https://media.giphy.com/media/H8XZI3PJm258c/giphy.gif',
                'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
                'https://media.giphy.com/media/kU586ictpGb0Q/giphy.gif'
            ];
            const kissGif = gifs[Math.floor(Math.random() * gifs.length)];

            message.delete();
            message.channel.send(new Discord.MessageEmbed().setColor(config.color).setImage(kissGif).setDescription(`${message.author} kissed <@${message.mentions.members.first().id}>! 😚❤️`));

        } else { // Perm check
            message.react(config.failureEmoji)
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failureColor).setDescription(`${config.failureEmoji} You must be a VIP to use this command!`));
        }

    }
}
