const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'slap',
    description: "slaps a user",
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
            'https://media1.tenor.com/images/2277b29821fcef8324a73c839473edd5/tenor.gif',
            'https://media1.tenor.com/images/477821d58203a6786abea01d8cf1030e/tenor.gif',
            'https://media1.tenor.com/images/9ea4fb41d066737c0e3f2d626c13f230/tenor.gif',
            'https://media1.tenor.com/images/299366efafc95bc46bfd2f9c9a46541a/tenor.gif',
            'https://media1.tenor.com/images/7cd22e9a02e2826361ae52a2412dea14/tenor.gif',
            'https://media1.tenor.com/images/dcd359a74e32bca7197de46a58ec7b72/tenor.gif',
            'https://media1.tenor.com/images/153b2f1bfd3c595c920ce60f1553c5f7/tenor.gif'
        ];
        const slapGif = gifs[Math.floor(Math.random() * gifs.length)];

        message.delete();
        message.channel.send(new Discord.MessageEmbed().setColor(config.color).setImage(slapGif).setDescription(`${message.author} slapped <@${message.mentions.members.first().id}>! ✋ 💢`));

    } else { // Perm check
        message.react(config.failureEmoji)
        return message.channel.send(new Discord.MessageEmbed().setColor(config.failureColor).setDescription(`${config.failureEmoji} You must be a VIP to use this command!`));
    }

    }
}
