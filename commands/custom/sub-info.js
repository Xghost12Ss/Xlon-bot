const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'subinfo',
    description: "sub perks",
    run: async (bot, message, args) => {

        const subInfo = new Discord.MessageEmbed ()
        .setColor(config.color)
        .setDescription(`**Subscriber Perks**\n________________________\n\nDiscord Perks\n\n \`${config.prefix}slap user\`  \`${config.prefix}cake\`  \`${config.prefix}hug user\` \`${config.prefix}fact\` | Unique Commands \n - Sub only chat/vc.\n - Seans Unique Twitch Emote\n - Unique Twitch Subscriber Roles.  \n________________________\n\nMinecraft Perks\n\n - Early access to new worlds/events and game modes.\n - Subscriber Prefix \`(Survival Server)\`.\n - Weekly Survival Kit.\n - £3,000 a week \`(Survival Server Currency)\`.\n - Ability to fly in lobbies.\n________________________\n\n Twitch Perks\n\n - Sub Emotes.\n - Sub Only Chat.\n________________________ `) 
        .setFooter(config.botName, config.botIcon);
        message.channel.send(subInfo);
    }

} 