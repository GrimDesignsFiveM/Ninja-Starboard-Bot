//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const star = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../../commanddata/config.json");
const fs = require("fs");
const starOwner = config.ownerID

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (star, message, args) => {

//Here we define who the owner and the bot are and allow them to be mentioned in the message
let owner = star.users.get('444609097233465347');
let bot = star.users.get('544049582959755264');  
  
//This is the embed message code for the command
   message.delete().catch();
 const embed = new Discord.RichEmbed()
   embed.setTitle("About Ninja Starboard")
    embed.setThumbnail("https://i.imgur.com/NSHqjRM.jpg")
     embed.setDescription("Ninja Starboard requires a ``ninja-starboard`` Channel")
      embed.setColor("#0x3dfbff")
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
    name: 'setup',
    description: 'Tells you how to setup Ninja Starboard',
    usage: 'star setup',
    group: 'System'
  };
