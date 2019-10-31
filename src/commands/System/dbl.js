//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const snekfetch = require('snekfetch');
const request = require('superagent');
 
exports.run = async (client, message, args) => {
if (message.author.id !== '510065483693817867') return message.channel.send('You scrub, what made you think you\'d be able to do that??');
 request.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
      .set('Authorization', process.env.dbotsToken)
      .send({ server_count: client.guilds.size })
      .end();
    message.reply("Successfully fetched the Discord Bot List API");
    request.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
      .set('Authorization', process.env.dbotsToken2)
      .send({ server_count: client.guilds.size })
      .end();
    message.reply("Discord Bot List guild count updated");
    message.reply("Bot List page updated, Finished :white_check_mark:");
  }
 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'dbl',
    description: 'Updates the bots server count on the discord bot list',
    permissions: 'Bot Owner Only!',
    usage: 'star dbl',
    group: 'Control Module'
  };
 
