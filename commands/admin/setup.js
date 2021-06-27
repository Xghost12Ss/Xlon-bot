const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'setup',
    description: "setup bot message",
    run: async (bot, message, args) => {

        const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);
        const user = message.mentions.users.first() || message.author;

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            const userPermError = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`);
            return message.reply(userPermError)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                });
        }

        // message prompts
        if (args == '1') {
            const page1 = await new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`**Setup and Configure - Nitron**\n\n• The bot must have a role with the \`ADMINISTRATOR\` permission assigned to it.\n\nUse \`${config.prefix}setup 2\` to go to the next page.`)
                .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
            message.reply(page1);
            return;
        }

        if (args == '2') {
            const page2 = await new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`**Setup and Configure - Nitron**\n\n• You must have a channel named \`#bot-logs\` for moderation commands to be logged\n\nUse \`${config.prefix}setup 3\` to go to the next page.`)
                .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
            message.reply(page2);
            return;
        }

        if (args == '3') {
            const page3 = await new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`**Setup and Configure - Nitron**\n\n• You must have a channel named \`#staff-mail\` to receive staff mail as well as user reports from server members.\n\nUse \`${config.prefix}setup 4\` to go to the next page.`)
                .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
            message.reply(page3);
            return;
        }

        if (args == '4') {
            const page4 = new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`**Setup and Configure - Nitron**\n\n• You must create a new role named one of the following names: [click here](https://pastebin.com/xx5uVN0t) for a list! Assign this role to users who should be considered VIP. This will permit those users to execute VIP commands, such as \`${config.prefix}hug user\`.\n\nUse \`${config.prefix}setup 5\` to go to the next page.`)
                .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
            message.reply(page4);
            return;
        }

        if (args == '5') {
            const page5 = new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`**Setup and Configure - Nitron**\n\n• You must create a new role named \`Filter Bypass\`. Assign this role to users who should be permitted to bypass the chat filter.\n\nUse \`${config.prefix}setup 6\` to go to the next page.`)
                .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
            message.reply(page5);
            return;
        }

        if (args == '6') {
            const page6 = await new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`**Setup and Configure - Nitron**\n\n• You must create a new role named \`'Muted'\`. This step is optional, as the role is created automatically if the bot doesn't detect it.\n\nYou have reached the end of the setup! Congratulations! :tada:\nFor a list of available commands, you can use \`${config.prefix}help\``)
                .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
            message.reply(page6);
            return;
        }

        const page = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`**Setup and Configure**\n\n**Please note:** you *will* need to configure roles in the server settings in order to complete the setup, and allow the bot to function. \n\nUse \`${config.prefix}setup 1\` to begin setup.`)
            .setFooter(`${config.botName}, ${config.botVersionShort}`, config.botIcon);
        message.reply(page);

    }
}
