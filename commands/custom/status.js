const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'status',
    description: "checks network",
    run: async (bot, message, args) => {
        
        const prefix = config.prefix //Bot command prefix
        var request = require('request');
        var CMD = 'ping'; //Command to trigger
        var mcIP = 'artis-network.tk'; //Add your Minecraft server IP
        var mcPort = 25565; //The port of the server, default it 25565
        var serverName = 'Artis Network'; //Your server name
        var serverLogo = config.botIcon; //Server logo

        var url = 'https://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort; 

        request(url, function (err, response, body) {
            if (err) {
              console.log(err);
              return message.reply('Error getting Minecraft server status...');
            }
            
            body = JSON.parse(body);
            var status = "Offline"
            var color = config.color
            if (body.online) {
              status = "Online";
              color = config.color
            }
            var players = 0
            if (body.players.now) {
              players += body.players.now;
            }
            else {
              players += 0
            }
            
            const embed = {
              "author": {
                "name": serverName + " Server Status",
                "icon_url": serverLogo
              },
              "color": color,
              "fields": [
                {
                  "name": "Status:",
                  "value": status,
                  "inline": true
                },
                {
                  "name": "Players Online:",
                  "value": "**" + body.players.now + "** / **" + body.players.max + "**",
                  "inline": true
                }
              ],
              "footer": {
                "text": "IP: " + mcIP
              }
            };
            message.channel.send({ embed });
        })

    }
}