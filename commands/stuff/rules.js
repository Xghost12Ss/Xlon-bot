const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'rules',
    description: "rules",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`))
        }

        if (message.deletable) {
            message.delete();

            const infoEmbed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle(`Official Server Rules`)
                .setDescription(`
                @everyone

                **Text Channel Rules:**
                1) *No self advertisement outside of promotion channels*
                2) *No excessive swearing!*
                3) *No tagging staff unless absolutely necessary.*
                4) *No spamming in any channels!*
                5) *No more than 1 alt in the sever.*
                6) *Keep NSFW in the classified channel.*
                7) *No politics.*
                8) *No IRL images of users in ANY channels.*
                9) *No chat flooding*
                10) *No attempting to bypass chat filter/blacklisted words*
                11) *Only Administrators are permitted to upload files in any channel*

                **Voice Channel Rules:**
                1) *No voice changers in any voice channels*
                2) *No ear raping in any channels*
                3) *Blocked words in text channels still apply*

                Thank you,
                Have a great day!
                `)

            message.reply(infoEmbed);

        };

    }
}
