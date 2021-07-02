const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');
require('dotenv').config()

module.exports = {
  name: 'shutdown/override',
  description: "overrides bot shut down",
  run: async (bot, message, args) => {

    message.delete();

    if (message.author.id === config.ownerId) {

      const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

      bot.user.setPresence({ status: 'offline' })
      message.channel.send(new Discord.MessageEmbed().setColor("#8AC33E").setDescription(`${config.successEmoji} The bot has successfully been shut down. This process can take up to 20 seconds. Please wait while the bot appears offline..`))

      const botShutdownLog = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor('Bot Shutdown', message.author.avatarURL())
        .setDescription(`Shutdown by: ${message.author}\nShutdown From: <#${message.channel.id}>\nOverriden Shutdown: \`True\``)
        .setTimestamp()
      logs.send(botShutdownLog);

      bot.user.setPresence({ status: 'offline' })

      setTimeout(function () {
        console.log("The bot has been shutdown manually. Please close this instance of the bot, and open a new one.");
        console.log("The bot has been shutdown manually. Please close this instance of the bot, and open a new one.");
        console.log("The bot has been shutdown manually. Please close this instance of the bot, and open a new one.");
        bot.user.setPresence({ status: 'offline' })
        bot.destroy();
      }, 1000)

    }

  }
}