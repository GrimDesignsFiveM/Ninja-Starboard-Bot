 /*//////////////////////////////////////////////////////////////////////////////////////
 * Code by Tyler. H#9393!!
 * Ninja Discord Modertion Bot v1.00
 *
 *  I DO NOT authorize you to use this bot or the corresponding code without my consent first violation in this term will result in a copyright strike or lawsuit
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
const client = new Discord.Client();
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
client.music = require("discord.js-musicbot-addon");
const musicCommands = require("./src/music.json");

//////////////////////////////***PLAYING STATUS, INVITE TIMEOUTS & MORE***////////////////////////////////////////
  client.on('ready',  async () => {
let activities = [
  {
    name:`${activity1} in ${client.guilds.size} Servers`,
    options:{
      type:`${type1}`
    }
  },
  {
    name:`${activity2} for ${client.users.size} Users`,
    options:{
      type:`${type2}`
    }
  },
  {
    name: `${activity3} in ${client.channels.size} Channels`,
    options:{
      type:`${type3}`
    }
  },
   {
     name: `${activity4} ${client.users.size} Users`,
     options:{
     type: `${type4}`
  }
}
]
let i = 0;

    console.log(`${client.user.username} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    timers.setInterval(() => {
      i = i == activities.length ? 0 : i
      client.user.setActivity(activities[i].name, activities[i].options)
      i++
    }, time1)
  });

const Auditlog = require("discord-auditlog");
// will send all event to #audit-logs channel
// will send movement (join/leave) to #in-out channel if the channel exist
Auditlog(client);

client.config = config;

// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

//This is the bots startup log output and playing status.
//client.on("ready",  async () => {
//console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
 // client.user.setGame(`nb/help in ${client.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);

  // "ready" isn't really ready. We need to wait a spell.
  wait(1000); 

//////////////////////////////***SERVER INVITES CACHE FEATURE***////////////////////////////////////////////////
/* This event is required for loading all invites for all guilds and saving them to the cache. */
	
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
// });

//////////////////////////////***MEMBER JOINED INVITE LOG***////////////////////////////////////////////////
/* This event logs what invte code was used when a member joins the server */
client.on('guildMemberAdd', member => {
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.find(channel => channel.name === "invite-logs");
    // A real basic message with the information we need. 
 let iEmbed = new Discord.RichEmbed()
   .setTitle("Ninja Invite Logs")
   .setThumbnail("https://cdn.discordapp.com/avatars/595155471611068426/b6ffdf628b989aa8c55c446ff623042f.png?size=2048?size=1024")
   .setDescription(`<@${member.user.id}> Joined using the invite code below`)
   .setColor("#0x3dfbff")
   .addField("Member Tag", `${member.user.tag}`, true)
   .addField("Invite Code", `https://www.discord.gg/${invite.code}`, true)
   .addField("Invited By", `<@${inviter.id}>`, true)
   .addField("Code Used ", `${invite.uses} times since its creation.`, true)
   .setFooter(`© Ninja Bot v1.00`, `https://cdn.discordapp.com/avatars/595155471611068426/b6ffdf628b989aa8c55c446ff623042f.png?size=2048?size=1024`);
   logChannel.send(iEmbed);
  });
 });

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
let gcEmbed = new Discord.RichEmbed()
 .setTitle("Thanks For Adding Me")
 .setColor("#0x3dfbff")
 .setTimestamp()
 .setDescription("***Please Note:** Ninja Bot requires various channels to complete proper setup")
 .addField("Setup Help", "``nb/setup`` Shows you how to setup Ninja Bot") 
 .setFooter("Ninja Bot")
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`gen help in ${client.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);
  guild.owner.send(gcEmbed)
 });

//////////////////////////////***MESSAGE DELETE FUNCTIONS***/////////////////////////////////////////////
/*This event allows any message that the bot reacts to with the emoji provided,
to be deleted when the reaction is pressed by ANY user (Not admin only)*/
client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (reaction.emoji.name === "🆗") {
    reaction.message.delete();
    }
})

//////////////////////////////***WELCOME MESSAGE FUNCTIONS***////////////////////////////////////////////////
//////////////////////////////***SINGLE SERVER AND EVERY SERVER***//////////////////////////////////////////
// welcome message and welcome image when a new member joins the guild
//client.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
//let guild = member.guild; 
//let memberTag = member.user.tag 
//let systemChannel = guild.channels.find("name", "welcome")      
//if(guild.systemChannel){
	/*guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
	.setTitle(":white_check_mark: User joined") // Calling method setTitle on constructor. 
	.setDescription(`<@${member.user.id}> Just joined the server. Make sure you read our rules channel and react to the message to get the **Verified Members** role!`) // Setting embed description
        .addField("Member Tag", memberTag)
        .addField(`Member ID`, `${member.user.id}`)
	.setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
	.addField("New Member Count", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
	.setTimestamp() // Sets a timestamp at the end of the embed
	);
}
});*/

/*client.on('message', async message => {
    let tDate = moment().format('LLLL');*/
 
    //!Tyler
    /*if (message.content === `<@444609097233465347>`) {
       let ownerEmbed = new Discord.RichEmbed()
            .setTitle(":no_entry: User Unavailable :no_entry:")
            .setTimestamp()
            .setColor(config.embedColor)
            .setDescription(`<@${message.author.id}> Sorry :shrug:`)
            .addField("Reason", "My owner is currently Busy, Sleeping or AFK")
            .setFooter("Mention Detection")
          message.delete().catch()
          message.channel.send(ownerEmbed).then(msg => {msg.delete(23000)});
    };
});*/

client.on('messageUpdate', (oldMessage, newMessage) => {
   if (oldMessage.author.bot) return;
   let msgUpdLog = oldMessage.guild.channels.find(c => c.name.includes("ninja-logs"));
   if (!oldMessage.content || !newMessage.content) return;
   if (!msgUpdLog) return;
   const msgUpdLogEmbed = new Discord.RichEmbed()
       .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL)
       .setDescription(`A Message has been Updated in ${oldMessage.channel}`)
       .addField("Old Message", oldMessage)
       .addField("New Message", newMessage)
       .setTimestamp()
       .setFooter("Updated Message")
       .setColor(config.embedColor)
   msgUpdLog.send(msgUpdLogEmbed);
});
 
client.on('messageDelete', async message => {
   if (message.author.bot) return;
   let msgDelLog = message.guild.channels.find(c => c.name.includes("ninja-logs"));
   if (!msgDelLog) return;
   const msgDelLogEmbed = new Discord.RichEmbed()
       .setAuthor(message.author.tag, message.author.displayAvatarURL)
       .setDescription(`A Message has been Deleted in ${message.channel}`)
       .addField("Message Content", message)
       .setTimestamp()
       .setFooter("Deleted Message")
       .setColor(config.embedColor)
   msgDelLog.send(msgDelLogEmbed);
});


//removes bot's message if reacted with card thing
client.on("messageReactionAdd", async (messageReaction, user) => {
	if(messageReaction.message.author.id !== client.user.id) return undefined;
	if(user.bot) return undefined;
	if(messageReaction.emoji == '🎴') {

		setTimeout(async function() {
			await messageReaction.message.edit('5⃣');

			setTimeout(async function() {
				await messageReaction.message.edit('4⃣');

				setTimeout(async function() {
					await messageReaction.message.edit('3⃣');

					setTimeout(async function() {
						await messageReaction.message.edit('2⃣');

						setTimeout(async function() {
							await messageReaction.message.edit('1⃣');

							setTimeout(async function() {
								await messageReaction.message.delete()
							}, 1000);

						}, 1000);

					}, 1000);

				}, 1000);

			}, 1000);

		}, 1000);

		return null;
	  }

	  return null;
})


//basic message replies
client.on("message", async message => {
	if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return undefined;


	if(message.content.toUpperCase().includes('PRESS F')) {
		message.react('🇫');
		return null;
	}

	if(message.content.toUpperCase().includes('NYA')) {
		message.react('🐱');
		return null;
	}

	if(message.content.toUpperCase().includes('BAKA')) {
		message.react('💢');
		return null;
	}

	return null;
});

//////////////////////////////***EVENT COLLECTION FUNCTION***////////////////////////////////////////////////
//Allows the bot to log and show events (Joining New Servers)
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();
client.aliases = new Enmap();

//Stops the bot from responding to other bots.
client.on('message', message => {
  if(message.author.bot) return;
})

//////////////////////////////***DEFINE COMMANDS FUNCTION***////////////////////////////////////////////////
//client.commands = new Discord.Collection(); // Collection for all commands
//client.aliases = new Discord.Collection(); // Collection for all aliases of every ccommand

//This code line allows the commands to be individual/seperate files
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//////////////////////////////***DEFINE COMMANDS FUNCTION***////////////////////////////////////////////////
const modules = ['Admin', 'Actions', 'Games', 'Help', 'Memes', 'NSFW', 'Tickets', 'Applications', 'Utility', 'Modules', 'Support', 'Control']; // This will be the list of the names of all modules (folder) your bot oown

modules.forEach(c => {
fs.readdir(`./src/commands/${c}/`, (err, files) => { // Here we go through all folders (modules)
 if (err) throw err; // If there is error, throw an error in the console
  console.log(`[Commandlogs] Loaded ${files.length} commands of module ${c}`); // When commands of a module are successfully loaded, you can see it in the console
   files.forEach(f => { // Now we go through all files of a folder (module)
    const props = require(`./src/commands/${c}/${f}`); // Location of the current command file
     client.commands.set(props.help.name, props); // Now we add the commmand in the client.commands Collection which we defined in previous code
      props.conf.aliases.forEach(alias => { // It could be that the command has aliases, so we go through them too
       client.aliases.set(alias, props.help.name); // If we find one, we add it to the client.aliases Collection
       });
    });
 });

});
client.login(process.env.BOT_TOKEN); //process.env.BOT_TOKEN Allows the token to be defined and set via the bots database to ensure it is never public!

/* Code by Tyler. H#9393!!
 *  I DO NOT authorize you to use this bot or the corresponding code without my consent first.
 *  If you fork this Bot repo make sure you give me credit for all files and folders associated. 
 *  Due to the fact that no license is provided with this bot that means that it falls under the not publicly available category.
 * Unauthorized use of this bot could result in your GitHub and Discord accounts being terminated!
 */
