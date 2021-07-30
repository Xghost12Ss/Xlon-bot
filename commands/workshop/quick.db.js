const Discord = require("discord.js");
const config = require('../../config.json');
const messages = require('../../messages.json')

module.exports = {
    name: 'quickdb',
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


            // Setting an object in the database:
            db.set('warnings', { difficulty: 'Easy' })
            // -> { difficulty: 'Easy' }

            // Adding to a number (that doesn't exist yet) in an object:
            db.add('warnings.total', 500)
            // -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }

            // Fetching individual properties
            let warns = db.get('warnings.total'); // -> 1000

            message.channel.send(warns);
        }//

    }
}