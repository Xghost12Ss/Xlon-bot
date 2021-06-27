const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'qotd-list',
    description: "qotd lists",
    run: async (bot, message, args) => {

        var questions = require('../../commands/admin/data/questions.json');

        if(message.member.roles.cache.find(r => r.name === config.staffRole)){

            const questionsList = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`Question Of The Day`, message.author.avatarURL())
            .setDescription(`*An up-to date list of all the Question of the Day question possibilities*\n\nHeadsup: Due to JSON formatting, formatting (specifcally comma placements) the questions are not formatted properly\n\n\`${questions.questions}\``)
            .setTimestamp()
      
            message.channel.send(questionsList)
      
        } else {
            return message.channel.send(`${config.failureEmoji} You do not have permission to use this command!`)
        }

    }
}
