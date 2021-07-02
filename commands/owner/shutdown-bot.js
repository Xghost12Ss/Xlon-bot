const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');
require('dotenv').config()

module.exports = {
  name: 'shutdown-OOO111FFF',
  description: "shuts down bot",
  run: async (bot, message, args) => {

    message.delete();

    if (message.author.id === config.ownerId) {

      const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);

      if (message.author.bot) return

      if (!message.author.id === "360832097495285761") {
        return message.channel.send(`${config.failureEmoji} ${messages.globalPermError}`).then(m => m.delete(5000));
      }

      //Main command

      let arg = args.slice(1).join(" ");

      let filter = m => m.author.id === message.author.id

      const botShutdownQuery = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(`${config.alertEmoji} Are you sure you want to shutdown the bot? The bot cannot be started backup until the bot owner manually starts it. Type \`yes\` or \`no\``)
      message.channel.send(botShutdownQuery).then(() => {
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
          .then(message => {
            message = message.first()
            if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {

              bot.user.setPresence({ status: 'offline' })
              const botShutdownSuccess = new Discord.MessageEmbed()
                .setColor(config.successColor)
                .setDescription(`${config.successEmoji} The bot is shutting down. This can take up to 3 seconds..`)
              message.channel.send(botShutdownSuccess);

              const botShutdownLog = new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor('Bot Shutdown', message.author.avatarURL())
                .setDescription(`Shutdown by: ${message.author}\nShutdown From: <#${message.channel.id}>\nOverriden Shutdown: \`False\``)
                .setTimestamp()
              logs.send(botShutdownLog);

              setTimeout(function () {
                console.log("The bot has been shutdown manually. Please close this instance of the bot, and open a new one.");
                bot.destroy();
              }, 1000)

            } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {

              const botShutdownCancel = new Discord.MessageEmbed()
                .setColor(config.failColor)
                .setDescription(`${config.failureEmoji} Bot shutdown cancelled`)
              message.channel.send(botShutdownCancel);
            } else {

              const botShutdownInvalidResponse = new Discord.MessageEmbed()
                .setColor(config.failColor)
                .setDescription(`${config.failureEmoji} Cancelled: Invalid Response`)
              message.channel.send(botShutdownInvalidResponse);
            }
          })
          .catch(collected => {
            const botShutdownTimeout = new Discord.MessageEmbed()
              .setColor(config.failColor)
              .setDescription(`${config.failureEmoji} Cancelled: You took too long to respond!`)
            message.channel.send(botShutdownTimeout);
          });
      })

    } else {
      return message.channel.send(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} ${messages.globalPermError}`)).then(m => m.delete(5000));
    }

  }
}