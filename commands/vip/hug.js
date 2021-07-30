const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'hug',
    description: "hugs a user",
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
            'https://66.media.tumblr.com/e1a9173d418b3e35a4c60f14a998bc93/tumblr_pb7ypiim3t1tx45yjo1_500.gif',
            'https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif',
            'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
            'https://media.giphy.com/media/DjczAlIcyK1Co/giphy.gif',
            'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif',
            'https://media.giphy.com/media/pXQhWw2oHoPIs/giphy.gif',
            'https://media1.tenor.com/images/b87f8b1e2732c534a00937ffb24baa79/tenor.gif'
        ];
        const hugGif = gifs[Math.floor(Math.random() * gifs.length)];

        message.delete();
        message.channel.send(new Discord.MessageEmbed().setColor(config.color).setImage(hugGif).setDescription(`${message.author} hugged <@${message.mentions.members.first().id}>! ❤️😘`));

    } else { // Perm check
        message.react(config.failureEmoji)
        return message.channel.send(new Discord.MessageEmbed().setColor(config.failureColor).setDescription(`${config.failureEmoji} You must be a VIP to use this command!`));
    }
    }
}
