const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'links',
    description: "useful dev links",
    run: async (bot, message, args) => {

        if (message.guild.me.hasPermission("ADMINISTRATOR")) { //double check perms to prevent no perm error

            if (message.author.id === config.ownerId) {

                let invite = await message.channel.createInvite(
                    {
                        maxAge: 10 * 60 * 1000, // maximum time for the invite in ms
                        maxUses: 0 // maximum times it can be used
                    },
                    `Requested with command by ${message.author.tag}`
                );

                const finalEmbed = new Discord.MessageEmbed().setAuthor(`Useful Developer Links`, message.author.avatarURL({ dynamic: true })).setColor(config.color).setDescription(`Go to: [Discord Invite](${invite})\nGo to: [Bot Invite Link](https://canary.discord.com/api/oauth2/authorize?client_id=${config.botId}&permissions=0&scope=bot)\n Go to: [Discord Dev Portal](https://canary.discord.com/developers/applications)`);
                message.reply(finalEmbed)
                    .then(msg => {
                        msg.delete({ timeout: 14000 })
                    })

            }

        } else {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        } //double check perms to prevent no perm error

    }
}