 /*//////////////////////////////////////////////////////////////////////////////////////
 * Code by Tyler. H#9393!!
 * Ninja Starboard Bot
 *
 *  I DO NOT authorize you to use this bot or the corresponding code without my consent first violation of this term will result in a copyright strike or lawsuit
 *  If you fork this Bot repo make sure you give me credit for all files and folders associated as all the branding for this bot is registered and copy written. 
 *  Due to the fact that no license is provided with this bot that means that it falls under the not publicly available category.
 //////////////////////////////////////////////////////////////////////////////////////*/

//////////////////////////////***IMPORT AND EXPORT MODULES***////////////////////////////////////////////////
//////////////////////////////***TO AND FROM DATABASE/BANK***////////////////////////////////////////////////
/*
This imports all the folders and files for the required node modules from the bots database to be read (DO NOT touch these)
//These import options will be disabled untill MySQL support is fully implemented, Enabling these without DB support will throw errors.
//import Discord = require('discord.js');
//import Music = require('discord.js-musicbot-addon');
//import Enmap = require("enmap");
//import fs = require("fs");
//import snekfetch = require('snekfetch');
//import talkedRecently = new Set();
//import token = process.env.BOT_TOKEN; //Replace with config.token if self hosting and define the token in the config. 
//import client = new Discord.Client();
//import config = require('./data/config.json');
//import adlinks = require('./src/blacklist/blacklistedlinks.json');
//import offensivewords = require('./src/blacklist/blacklistedwords.json');
//import profanities = require('./src/blacklist/blacklistedswears.json');
//import antispam = require('discord-anti-spam');
//import chalk = require('chalk');
//import mysql = require('mysql');
//import mongoose = require('mongoose');
//import spamDetector = require('./anti_spam.js');
//import Canvas = require('canvas');
//import { Kayn, REGIONS } = require('kayn');
//import mysql = require('mysql');
//import file = require('../mysql.json');
//import { CommandoClient } = require('./commando')
//import jimp = require('jimp');
*/

//////////////////////////////***REQUIRED NODE MODULES***////////////////////////////////////////////////
/* This is where the bot reads the required node modules, DO NOT touch these. */
//const mysql = require('mysql');
//const mongoose = require('mongoose');
//const spamDetector = require('./anti_spam.js');
//const { Kayn, REGIONS } = require('kayn');
//const mysql = require('mysql');
//const file = require('../mysql.json');
//const { CommandoClient } = require('./commando')
//const jimp = require('jimp');
//const blacklist = require("./data/serverfilters.js");
const Discord = require("discord.js");
const Music = require('discord.js-musicbot-addon');
const Enmap = require("enmap");
const fs = require("fs");
const moment = require("moment"); 
const snekfetch = require('snekfetch');
const talkedRecently = new Set();
const token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;
const prefix2 = require('./data/config.json');
const prefix3 = require('./data/config.json');
const prefix4 = require('./data/config.json');
const InvPerm = require('./data/config.json');
const star = new Discord.Client();
const starLog = console.log;
const config = require('./data/config.json');
const adlinks = require('./src/blacklist/blacklistedlinks.json');
const offensivewords = require('./src/blacklist/blacklistedwords.json');
const profanities = require('./src/blacklist/blacklistedswears.json');
const antispam = require('discord-anti-spam');
const chalk = require('chalk');
const Canvas = require('canvas');
const dbots = require('superagent')
const timers = require('timers')
const activity1 = config.activity1
const type1 = config.type1
const activity2 = config.activity2
const type2 = config.type2
const activity3 = config.activity3
const type3 = config.type3
const type4 = config.type4
const activity4 = config.activity4
const time1 = config.activitytime
star.music = require("discord.js-musicbot-addon");
const musicCommands = require("./src/music.json");
const embedFooter = require(config.embedFooter);
const embedLink = require(config.embedLink);

//////////////////////////////***PLAYING STATUS, INVITE TIMEOUTS & MORE***////////////////////////////////////////
  star.on('ready',  async () => {
let activities = [
  {
    name:`${activity1} in ${star.guilds.size} Servers`,
     options:{
      type:`${type1}`
    }
  },
  {
    name:`${activity2} for ${star.users.size} Users`,
     options:{
      type:`${type2}`
    }
  },
 {
    name:`${activity3}`,
     options:{
      type:`${type2}`
    }
  }
]
let i = 0;

    starLog(`${star.user.username} has started, with ${star.users.size} users, in ${star.channels.size} channels of ${star.guilds.size} guilds.`);
    timers.setInterval(() => {
      i = i == activities.length ? 0 : i
      star.user.setActivity(activities[i].name, activities[i].options)
      i++
    }, time1)
  });

star.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
const embed = new Discord.RichEmbed()
 embed.setTitle("Thanks For Adding Me")
 embed.setColor("#0x3dfbff")
 embed.setTimestamp()
 embed.setDescription("***Please Note:** Ninja Starboard requires a ``ninja-starboard`` channel to complete proper setup")
 embed.addField("About Me", "``star about`` Tells you some info about me")
 embed.addField("Setup Help", "``star setup`` Shows you how to properly set me up")
 embed.addField("Starboard Invite", `[Invite Me Here](https://discordapp.com/api/oauth2/authorize?client_id=629452785112449054&permissions=2147483127&scope=bot)`)
 embed.setFooter(config.embedFooter, config.embedLink);

  starLog(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  star.user.setGame(`gen help in ${star.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);
  guild.owner.send(embed)
 });

//////////////////////////////***MESSAGE DELETE FUNCTIONS***/////////////////////////////////////////////
/*This event allows any message that the bot reacts to with the emoji provided,
to be deleted when the reaction is pressed by ANY user (Not admin only)*/
star.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (reaction.emoji.name === "🆗") {
    reaction.message.delete();
    }
})

//////////////////////////////***EVENT COLLECTION FUNCTION***////////////////////////////////////////////////
//Allows the bot to log and show events (Joining New Servers)
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    star.on(eventName, event.bind(null, star));
  });
});

star.commands = new Enmap();
star.aliases = new Enmap();

//Stops the bot from responding to other bots.
star.on('message', message => {
  if(message.author.bot) return;
})

//////////////////////////////***DEFINE COMMANDS FUNCTION***////////////////////////////////////////////////
const modules = ['Help', 'System']; // This will be the list of the names of all modules (folder) your bot oown

modules.forEach(c => {
fs.readdir(`./src/commands/${c}/`, (err, files) => { // Here we go through all folders (modules)
 if (err) throw err; // If there is error, throw an error in the console
  starLog(`[Commandlogs] Loaded ${files.length} commands of module ${c}`); // When commands of a module are successfully loaded, you can see it in the console
   files.forEach(f => { // Now we go through all files of a folder (module)
    const props = require(`./src/commands/${c}/${f}`); // Location of the current command file
     star.commands.set(props.help.name, props); // Now we add the commmand in the client.commands Collection which we defined in previous code
      props.conf.aliases.forEach(alias => { // It could be that the command has aliases, so we go through them too
       star.aliases.set(alias, props.help.name); // If we find one, we add it to the client.aliases Collection
       });
    });
 });

});
star.login(process.env.BOT_TOKEN); //process.env.BOT_TOKEN Allows the token to be defined and set via the bots database to ensure it is never public!

/* Code by Tyler. H#9393!!
 *  I DO NOT authorize you to use this bot or the corresponding code without my consent first.
 *  If you fork this Bot repo make sure you give me credit for all files and folders associated. 
 *  Due to the fact that no license is provided with this bot that means that it falls under the not publicly available category.
 * Unauthorized use of this bot could result in your GitHub and Discord accounts being terminated!
 */
