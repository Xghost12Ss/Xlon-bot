const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'qotd-sch',
    description: "Question of the day schedule",
    run: async (bot, message, args) => {

        if (!message.member.roles.cache.find(r => r.name === config.staffRole)) {
            return message.channel.send(`${config.failureEmoji} ${messages.globalPermError}`).then(m => m.delete(5000));
        }

        const questions = require("../../events/data/questions.json")
        var question = Math.floor(Math.random() * questions.length);

        message.delete()

        const qotdEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle('Question Of The Day')
            .setDescription(`Question: ${questions.question}\nStart a discussion! <#807038750160584724>`)

        bot.channels.cache.get("807038816882786344").send(qotdEmbed);
        return;

    }
}
