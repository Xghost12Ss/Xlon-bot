module.exports = (bot, message) => {
  require('dotenv').config()
  const config = require('../config.json');
  const messages = require('../messages.json');
  let guild = bot.guilds.cache.get.id;

  let status = `Xlon`
  bot.user.setPresence({ status: 'online' })
  bot.user.setActivity(status, { type: "PLAYING" });

 //bot.user.setActivity(`Nitron ${config.botVersionShort} | ${config.prefix}help`, {
 //  type: "STREAMING",
 //  url: "https://www.twitch.tv/axtonprice"
 //});

  //ANTI SPAM
  const Discord = require('discord.js');
  const client = new Discord.Client();
  const AntiSpam = require('discord-anti-spam');
  const antiSpam = new AntiSpam({
    warnThreshold: 10000000, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
    banThreshold: 10000000, // Amount of messages sent in a row that will cause a ban.
    muteThreshold: 10000000, // Amount of messages sent in a row that will cause a mute.
    maxInterval: 4000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '{@user} has been kicked for spamming.',
    banMessage: '{@user} has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    muteMessage: '{@user} has been muted for spamming.', // Message that will be sent in chat upon muting a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesMute: 9, // Amount of duplicate messages that trigger a warning.
    // Discord permission flags: https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
    exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions(These are not roles so use the flags from link above).
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: ["360832097495285761"], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
  });

  bot.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));

  bot.on('message', (message) => antiSpam.message(message));

  const totalUsers = bot.users.cache.size;
  const totalChannels = bot.channels.cache.size;
  const totalServers = bot.guilds.cache.size;

  console.log(`Xlon is online! Serving ${totalServers} servers, ${totalUsers} users, in ${totalChannels} channels!`);
  console.log(``);
  //END

  //SWEAR FILTER
  var profanities = require('../profanities.json');

  bot.on('message', async message => {
    if (message.author.bot) return;
    const logs = await message.guild.channels.cache.find(channel => channel.name === `${config.logsChannel}`);
    let msg = message.content.toLowerCase();
    for (x = 0; x < profanities.profanities.length; x++) {

      if (!message.guild.roles.cache.get(r => r.name === "Filter Bypass")) {

        if (msg.includes(profanities.profanities[x])) {
          // await message.reply(`you can't say that here!`)
          message.delete()

          const autoDelmessage = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor('Blocked Message', message.author.avatarURL())
            .setThumbnail('https://cdn.discordapp.com/attachments/361548231987036170/799271598661042217/Trash.png')
            .setDescription(`A message was automatically deleted because it contained a blacklisted word\n\nMessage author:\n<@${message.author.id}>\nMessage:\n\`${message.content}\`\nChannel:\n<#${message.channel.id}>`)
            .setTimestamp()
          logs.send(autoDelmessage);

          const user = message.author;
          console.log(`WARN: Message flagged on server ${message.guild.name} by user ${message.author.tag} for saying: ${message.content}`);
          console.log(``);

          return;
        }
      }
    }
  });
  //END

  // Bot ping reply
  bot.on('message', message => {
    if (message.mentions.has(bot.user)) {
      if (message.author.bot) return;
      if (message.content === "@everyone") return;
      if (message.content === "@here") return;
      message.reply(`**My prefix here is:** \`${config.prefix}\``);
    }
  });
  //

}