//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../../commanddata/config.json");
const fs = require("fs");
const snekfetch = require('snekfetch');

exports.run = (client, message, args) => {
   let hEmbed = new Discord.RichEmbed()
   .setTitle("Ninja Bot Command Modules")
   .setDescription(`<@${message.author.id}>` + "Below is a list of my commands and their usage.")
   .setColor(client.config.embedColor)
   .addField("nb/opt-in | nb/opt-out", "Opt in or out of data collection, used for **User Info** commands")
   .addField("nb/modules", "Shows a list of my available command modules")
   .addField("nb/helpcmds", "Shows a list of my available help commands")
   .addField("Ninja Bot Links", "[Website](https://ninja-bot.webnode.com/) | [Twitter](https://twitter.com/NinjaDiscordBot)", true)
   .addField("Ninja Bot Support", "[Support Server](https://discord.gg/yFmtAUM)", true)
   .addField("Please Note", "Any message from me can be removed by reacting with a 🎴 emoji!")
   .setFooter("Additional Usage: nb/help <command>");

   let hEmbed2 = new Discord.RichEmbed()
   .setTitle("Ninja Bot Command Modules")
   .setDescription(`<@${message.author.id}>` + "Below is a list of my commands and their usage.")
   .setColor(client.config.embedColor)
   .addField("nb/opt-in | nb/opt-out", "Opt in or out of data collection, used for **User Info** and **Server Info** commands")
   .addField("nb/modules", "Shows a list of my available command modules")
   .addField("nb/helpcmds", "Shows a list of my available help commands")
   .addField("Ninja Bot Links", "[Website](https://ninja-bot.webnode.com/) | [Twitter](https://twitter.com/NinjaDiscordBot)", true)
   .addField("Ninja Bot Support", "[Support Server](https://discord.gg/yFmtAUM)", true)
   .addField("Please Note", "Any message from me can be removed by reacting with a 🎴 emoji!")
   .setFooter("Additional Usage: nb/help {command}");

   let hEmbed3 = new Discord.RichEmbed()
   .setTitle("Ninja Bot Modules")
   .setDescription(`<@${message.author.id}> Help message sent :thumbsup: check your DM's`)
   .setColor(client.config.embedColor)
   .setFooter(`© Ninja Bot`);

   let hEmbed6 = new Discord.RichEmbed()
   .setTitle("Umm NOPE!!! :shrug:")
   .setDescription(`<@${message.author.id}> That command doesn't exist`)
   .setColor(client.config.embedColor)
   .setFooter(`© Ninja Bot`);

      if(!args[0]){
      message.author.send(hEmbed)
      message.channel.send(hEmbed3)
      .catch(e =>{
        if (e) {
        message.channel.send("Loading");
        message.channel.send(hEmbed2);
        message.delete().catch()
       }
      });
    }else{
      let command = args[0];
      if (client.commands.has(command)) {
      comd = client.commands.get(command);
      let hEmbed4 = new Discord.RichEmbed()
       .setTitle(`Command Help`)
       .setTimestamp()
       .setDescription(`${comd.help.description}`)
       .addField(`Permission Level`, `${comd.help.permissions}`)
       .addField(`Command Usage`, `${comd.help.usage}`)
       .addField(`Command Module`, `${comd.help.group}`)
       .setColor(client.config.embedColor)
       .setFooter(`© Ninja Bot v1.00`);
        //comd = client.commands.get(command);
        //return message.channel.send("```" + `\n` + "Description: " + cmd.help.description + `\n` + "Usage: " + cmd.help.usage + "```")
        return message.channel.send(hEmbed4)
      } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));  
      let hEmbed5 = new Discord.RichEmbed()
       .setTitle(`Command Help`)
       .setTimestamp()
       .setDescription(`${comd.help.description}`)
       .addField(`Permission Level`, `${comd.help.permissions}`)
       .addField(`Command Usage`, `${comd.help.usage}`)
       .addField(`Command Module`, `${comd.help.group}`)
       .setColor(client.config.embedColor)
       .setFooter(`© Ninja Bot v1.00`);
        //cmd = client.commands.get(client.aliases.get(command));  
        //return message.channel.send("```" + `\n` + "Description: " + cmd.help.description + `\n` + "Usage: " + cmd.help.usage + "```")
        return message.channel.send(hEmbed5)
      } else {
        return message.channel.send(hEmbed6)
        message.delete().catch()
      }
    }
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  permissions:'Everyone!',
  usage: 'nb/help or nb/help [command]',
  group: 'Help  Module' 
};
