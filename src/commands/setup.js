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
   .setDescription("Ninja Bot requires various channels for logs and ticket channels such as ninja-logs, audit-log, in-out, reports, suggestions, ticket-logs, application-logs & invite-logs These channels are not required if you do not want these features..")
   .setColor("#0x3dfbff")
   .setFooter(`© Ninja Bot v1.00`, `https://cdn.discordapp.com/avatars/595155471611068426/b6ffdf628b989aa8c55c446ff623042f.png?size=2048?size=1024`);
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
    name: 'setup',
    description: 'Tells you how to setup Ninja Bot',
    usage: 'nb/setup',
    group: 'Help'
  };
  
