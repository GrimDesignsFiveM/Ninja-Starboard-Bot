//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const moment = require('moment');
const star = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../../commanddata/config.json");
const fs = require("fs");
const ms = require("ms");
const snekfetch = require('snekfetch');
const owner = config.ownerID

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (star, message, args) => {

//This is your Command or Discord Rich Embed code Line followed by the end of the command. OR close "}" bracket	
let user = message.mentions.users.first();
  let muser = message.guild.member(message.mentions.users.first());
    if (!muser) muser = message.member;
    if(!user) user = message.author;

//Here we define who the owner and the bot are and allow them to be mentioned in the message
let owner = star.users.get('444609097233465347');
let bot = star.users.get('544049582959755264');  
  
//This is the embed message code for the command
   message.delete().catch();
const embed = new Discord.RichEmbed()
   embed.setTitle("About Ninja Starbboard")
   embed.setThumbnail("https://i.imgur.com/NSHqjRM.jpg")
   embed.setDescription("Ninja Starboard Is a Custom Starboard bot Coded in the ``discord.js`` library")
   embed.setColor(config.embedColor)
   embed.addField("Bot Author", `${owner}`, true)
   embed.addField("Author Tag", `${config.ownerName}`, true)
   embed.addField("Author ID", `${config.ownerID}`, true)
   embed.addField("Code Library", "[discord.js](https://discord.js.org/#/)", true)
   embed.addField('Current Status', `${star.user.presence.status.toUpperCase()}`, true)
   embed.addField('Current Game', `Streaming **${star.user.presence.game === null ? "No Game" : star.user.presence.game.name}**`, true)
   embed.addField('Bot Creation Date', `${moment(star.user.createdAt).toString().substr(0, 15)}\n(${moment(star.user.createdAt).fromNow()})`, true)        
   embed.addField("Open Source Project", "Yes this is an open source project | [GitHub Repo](https://github.com/GrimDesignsFiveM/Ninja-Starboard-Bot)", true)
   embed.addField("Starboard Support", "[Support Server](https://discord.gg/yFmtAUM)", true)
   embed.setFooter(`© Ninja Starboard Bot`, `https://i.imgur.com/NSHqjRM.jpg`);
   message.channel.send(embed).then(sentMessage => {
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
