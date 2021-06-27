const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json')

module.exports = {
    name: 'quickdb2',
    description: "joins a voice channel",
    run: async (bot, message, args) => {

        if (message.author.id === config.ownerId) {

            // Loading the database
            var _ = require('lodash');
            var _ = require('lodash/core');
            var fp = require('lodash/fp');
            var array = require('lodash/array');
            var object = require('lodash/fp/object');
            var at = require('lodash/at');
            var curryN = require('lodash/fp/curryN');
            const db = require('quick.db');
            // Loading end

            // Fetching individual properties
            let balance = db.get('userInfo.balance'); // -> 1000
            let items = db.get('userInfo.items'); // ['Sword', 'Watch']

            message.channel.send(balance);
            message.channel.send(items);

        }//

    }
}