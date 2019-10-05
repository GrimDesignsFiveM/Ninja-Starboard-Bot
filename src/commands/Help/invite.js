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
   embed.setTitle("Starboard Invite")
   embed.setThumbnail("https://i.imgur.com/NSHqjRM.jpg")
   embed.setDescription("Ninja Starboard Is a Custom Starboard bot Coded in the ``discord.js`` library")
   embed.setColor(config.embedColor)
   embed.addField("Starboard Invite", `[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=629452785112449054&permissions=2147483127&scope=bot)`, true)
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
    name: 'invite',
    description: 'Generates a invite link',
    usage: 'nb/invite',
    permissions: 'Everyone!',
    group: 'Help Module'
  };
