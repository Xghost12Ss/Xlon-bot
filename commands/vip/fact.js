const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'fact',
    description: "gives a random fact",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        message.react(`<:atlanta_success:736144092123234354>`)
        var facts = require('../../commands/vip/data/facts.json'); // facts list in data folder
        var fact = Math.floor(Math.random() * facts.length);
        const factEmb = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`Random Fact - [${message.author.username}]`, message.author.avatarURL({ dynamic: true }))
            .setDescription(`${facts[fact]}`)
        message.channel.send(factEmb);

    }
}
