const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json');

module.exports = {
    name: 'partnershipinfo',
    description: "partnershipinfo",
    run: async (bot, message, args) => {

            message.delete();

            const partner = new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor('Partnership Requirements', message.author.avatarURL({ dynamic: true }))
                .setDescription(`Looking to partner with us? Take a look at our requirements below. If you are interested in a partnership, type \`.partnership\` followed by your current stats in the <#807188845094371358> channel.\n
                \`• Must have a Discord server.\`\n
                \`• Must have 50+ members in Discord server.\`\n
                \`• Must represent a growing or popular brand or community.\`\n
                \`• Community must be English and only English.\`\n
                \`• Community must not break or endorce breaking Discord TO's, or any platform TO's it may be a part of.\``)
            message.author.send(partner)

    }
}
