const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'message-user',
    description: "sends user a dm",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId) {

        let mention = message.mentions.members.first();

        if (message.deletable) {
            message.delete();

            const UserEmbed = new Discord.MessageEmbed()
                .setColor(config.color)

                .setDescription('**BANNED FROM SERVER**\n\nUnfortunately, you are no longer welcome in the `SeanJackson88` community, due to major staff disrespect and threats to other users. This kind of behaviour is not welcome in our community. You will not be able to join the server again.\n\nSorry about that.')

                .setThumbnail("https://media.tenor.com/images/56bc17988e02b6534d824f82ffc8236a/tenor.gif")

                .setTimestamp()
                .setFooter(config.botName, config.botIcon);

            mention.send(UserEmbed);
            console.log("Message sent to given user ID");

        };

    } else {
        return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`)).then(m => m.delete(5000));
    }

    }
}
