const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'leave-vc',
    description: "joins a voice channel",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId) {

            // Only try to join the sender's voice channel if they are in one themselves
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.leave();
                message.channel.send('Disconnected!');
            } else {
                message.channel.send('You need to join a voice channel first!');
            }

        } else {
            return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`)).then(m => m.delete(5000));
        }

    }
}