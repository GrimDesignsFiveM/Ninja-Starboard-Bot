//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const moment = require('moment');
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../../commanddata/config.json");
const fs = require("fs");
const ms = require("ms");
const snekfetch = require('snekfetch');
const owner = config.ownerID

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {

//This is your Command or Discord Rich Embed code Line followed by the end of the command. OR close "}" bracket	
let user = message.mentions.users.first();
  let muser = message.guild.member(message.mentions.users.first());
    if (!muser) muser = message.member;
    if(!user) user = message.author;

//Here we define who the owner and the bot are and allow them to be mentioned in the message
let owner = client.users.get('444609097233465347');
let bot = client.users.get('544049582959755264');  
  
//This is the embed message code for the command
   message.delete().catch();
   let aEmbed = new Discord.RichEmbed()
   .setTitle("About Ninja Bot")
   .setThumbnail("https://cdn.discordapp.com/avatars/595155471611068426/b6ffdf628b989aa8c55c446ff623042f.png?size=2048?size=1024")
   .setDescription("Ninja Bot Is a ``Moderation, Fun & Support`` bot written in ``discord.js`` Ninja originally started as just a basic ticket bot but eventually expanded to more")
   .setColor("#0x3dfbff")
   .addField("Bot Author", `${owner}`, true)
   .addField("Author Tag", `${config.ownerName}`, true)
   .addField("Author ID", `${config.ownerID}`, true)
   .addField("Code Library", "[discord.js](https://discord.js.org/#/)", true)
   .addField('Current Status', `${client.user.presence.status.toUpperCase()}`, true)
   .addField('Current Game', `Streaming **${client.user.presence.game === null ? "No Game" : client.user.presence.game.name}**`, true)
   .addField('Bot Creation Date', `${moment(client.user.createdAt).toString().substr(0, 15)}\n(${moment(client.user.createdAt).fromNow()})`, true)        
   .addField("Current Version", "[Version 1.00-Patch-1](https://github.com/GrimDesignsFiveM/NinjaBot2.0/releases/tag/v1.00)", true)
   .addField("Ninja Bot Links", "[Website](https://ninja-bot.webnode.com/) | [Twitter](https://twitter.com/NinjaDiscordBot)", true)
   .addField("Ninja Bot Support", "[Support Server](https://discord.gg/yFmtAUM)", true)
   .setFooter(`© Ninja Bot`, `https://cdn.discordapp.com/avatars/595155471611068426/b6ffdf628b989aa8c55c446ff623042f.png?size=2048?size=1024`);
   message.channel.send(aEmbed).then(sentMessage => {
     sentMessage.react('🆗')
  });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Info', 'info', 'about', 'About', 'ab', 'Ab'],
    permLevel: 0
  };
  
exports.help = {
    name: 'about',
    description: 'Tells you some info about me',
    usage: 'nb/about',
    permissions: 'Everyone!',
    group: 'Help Module'
  };
