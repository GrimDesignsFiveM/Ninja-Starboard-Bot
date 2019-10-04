  
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
   .setTitle("Ninja Gen Support BackUp")
   .setThumbnail("https://cdn.discordapp.com/avatars/595155471611068426/b6ffdf628b989aa8c55c446ff623042f.png?size=2048?size=1024")
   .setDescription("Due to the fact that we are a Generator Server there is always a possibility that our server can be banned. So we have created a backup that you can join at the link below")
   .setColor("#0x3dfbff")
   .addField("Join My Backup Support Server", `[Join Here](https://www.discord.gg/TgQxGYN)`, true)
   .setFooter(`© Ninja Bot`, `https://cdn.discordapp.com/avatars/595155471611068426/b6ffdf628b989aa8c55c446ff623042f.png?size=2048?size=1024`);
   message.channel.send(aEmbed).then(sentMessage => {
	sentMessage.react('🆗')
        sentMessage.react('🗑️')
  });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Backup', 'backup', 'Bup', 'bup'],
    permLevel: 0
  };
  
exports.help = {
    name: 'backup',
    description: 'Generates a invite link for Ninja Gens backup support server',
    permissions: 'Everyone!',
    usage: 'nb/backup',
    group: 'Help Module'
  };
