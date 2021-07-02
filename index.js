const discord = require('discord.js');
const bot = new discord.Client({
    disabledEveryone: true
});
require('dotenv').config()

const fs = require("fs").promises;
const fsync = require("fs");
bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();

const path = require('path');

//SET PREFIX
const config = require('./config.json');
const PREFIX = config.prefix;

fs.readdir(path.join(__dirname, 'events'))
    .then(files => {
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let eventName = file.substring(0, file.indexOf(".js"));
            let eventModule = require(path.join(__dirname, 'events', eventName));
            bot.on(eventName, eventModule.bind(null, bot));
        })
    })
    .catch(err => console.log(err));

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
})

bot.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (!message.guild) return;
    if (!message.content.startsWith(PREFIX)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (command)
        command.run(bot, message, args);

})

bot.login(process.env.TOKEN);