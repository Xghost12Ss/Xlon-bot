const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'help',
    description: "Help command",
    run: async (bot, message, args) => {

        const helpEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`:clipboard: ALL CURRENTLY AVAILABLE COMMANDS :clipboard:`, message.author.avatarURL({ dynamic: true }))
            .setDescription(`The currenty prefix is set to \`${config.prefix}\`, you can use this before the command to execute it. For example: \`${config.prefix}help\`.\n\n`)
            .addFields(
                { name: 'Support Commands', value: `\`\`\`${config.prefix}report user reason \n${config.prefix}mail message \n${config.prefix}user-info user \n\`\`\``, inline: true },

                { name: 'Info Commands', value: `\`\`\`${config.prefix}help \n${config.prefix}ping \n${config.prefix}icon usern\n${config.prefix}infractions user\`\`\``, inline: true },

                { name: 'Fun Commands', value: `\`\`\`${config.prefix}meme \n${config.prefix}shake user \n${config.prefix}five user \n\`\`\``, inline: true },

                {
                    name: 'VIP Commands', value: `\`\`\`${config.prefix}cake \n${config.prefix}hug user \n${config.prefix}lick user \n${config.prefix}stab user \n${config.prefix}punch user \n${config.prefix}slap user
${config.prefix}spit user \n${config.prefix}wink user\`\`\`\n`, inline: true
                },
                
                { name: 'Contact & Support', value: `Our Website: http://nitron.ga/\nOur Discord: https://discord.gg/9ZRpfNp\nVote for us: https://top.gg/bot/${config.botId}/`, inline: false },
                )
            .setTimestamp()
            .setFooter(`${config.botName}`, config.botIcon);
        message.reply(helpEmbed);

    }
}