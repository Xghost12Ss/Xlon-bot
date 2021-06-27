const Discord = require('discord.js');
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: "newticket-000111FF",
    description: "creates a new ticket",
    run: async (bot, message, args) => {

        const client = bot;
        if (message.guild == null) return message.channel.send('Sorry, this command only works in servers/guilds')
        const everyone = await message.guild.roles.cache.find(role => role.name === "@everyone");
        if (message.guild == null) return;
        message.delete();
        try {
            if (!message.guild.channels.cache.find(c => c.name === 'Tickets' && c.type === 'category')) {

                await message.guild.channels.create(`ticket-${message.author.username}`, {
                    type: 'text',
                    permissionOverwrites: [{
                        allow: 'VIEW_CHANNEL',
                        id: message.author.id
                    }, {
                        allow: 'VIEW_CHANNEL',
                        id: '751757263382904882'
                    }],
                    parent: message.guild.channels.cache.find(c => c.name === 'Tickets' && c.type === 'category').id,
                }).then(ch => {
                    message.channel.send(new Discord.MessageEmbed()
                        .setDescription(`Ticket has been created! Please click here to go to the ticket channel: <#${ch.id}> \nYou will be served shortly.`).setColor(config.color).setFooter(message.author.username, message.author.avatarURL()));
                    ch.send(`<@${message.author.id}>\nPlease wait, you will be served shortly.`);
                    message.guild.channels.cache.find(c => c.name === 'Tickets' && c.type === 'category').setPosition(0)

                })
            } else {
                const categoryChannel = message.guild.channels.cache.find(c => c.name === 'Tickets' && c.type === 'category');

                message.guild.channels.create(`ticket-${message.author.username}`, {
                    type: 'text',
                    permissionOverwrites: [{
                        allow: 'VIEW_CHANNEL',
                        id: message.author.id
                    }, {
                        allow: 'VIEW_CHANNEL',
                        id: '751757263382904882'
                    }],
                    parent: categoryChannel.id,
                }).then(ch => {
                    message.channel.send(new Discord.MessageEmbed().setDescription(`Ticket has been created! Please click here to go to the ticket channel: <#${ch.id}> \nYou will be served shortly.`).setColor(config.color).setFooter(message.author.username, message.author.avatarURL()));
                    message.channel.send(`<@${message.author.id}>\nPlease wait, you will be served shortly.`);

                })
            }
        } catch (err) {
            message.channel.send(`${config.failureEmoji} It seems that I bumped into a error! Do I have the Manage Channels permission?`)
            console.log(err)

        }
    }
}