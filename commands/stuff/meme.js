const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'meme',
    description: "gives random memes",
    run: async (bot, message, args) => {

        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            const failedSetup = new Discord.MessageEmbed().setColor(config.failColor).setDescription(`${config.failureEmoji} The bot has not been setup yet, or is improperly configured. Please use the command \`${config.prefix}setup\` to begin the setup.`)
            return message.reply(failedSetup)
                .then(msg => {
                    msg.delete({ timeout: 14000 })
                })
        }

        const loadingEmbed = new Discord.MessageEmbed().setColor(config.color).setDescription(`${config.loadingEmoji} ${messages.globalProcessing}`);
        let loading = await message.reply(loadingEmbed);

        const snekfetch = require('snekfetch');
            try {
                const { body } = await snekfetch
                    .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
                    .query({ limit: 800 });
                const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
                if (!allowed.length) return message.reply('It seems we are out of memes! Try again later.');
                const randomnumber = Math.floor(Math.random() * allowed.length)
                
                const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle(allowed[randomnumber].data.title)
                .setDescription("Posted by: " + allowed[randomnumber].data.author)
                .setImage(allowed[randomnumber].data.url)
                .addField("Other info:", "Upvotes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
                .setFooter("Memes provided by r/dankmemes")
                message.reply(embed)
            } catch (err) {
                return console.log(err);
            
            }
            loading.delete();
    }
}
