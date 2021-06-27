const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');
fetch = require("node-fetch");

module.exports = {
    name: 'shorturl',
    description: "shortens url",
    run: async (bot, message, args) => {

        const url = args[0];
		if(!url){
			return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} You need to specify a long URL to shorten!`));
		}

		const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
		const body = await res.text();

		if(body === "You need to specify a long URL to shorten!"){
			return message.reply(new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} You need to specify a long URL to shorten!`));
		}

		const embed = new Discord.MessageEmbed()
			.setColor(config.color)
			.setDescription(`New URL: ${body}`);
		message.channel.send(embed);

    }
}
