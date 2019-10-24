/*/////////////////////////////////////////////////////////////////////////////////////
 * Code by Tyler. H#9393!! (☣ Tσxιƈ Dҽʋ ☣#7308)
 * Ninja Starboard Bot
 *
 *  I DO NOT authorize you to use this bot or the corresponding code without my consent first violation of this term will result in a copyright strike or lawsuit
 *  If you fork this Bot repo make sure you give me credit for all files and folders associated as all the branding for this bot is registered and copy written. 
 *  Due to the fact that no license is provided with this bot that means that it falls under the not publicly available category.
 //////////////////////////////////////////////////////////////////////////////////////
*/

//////////////////////////////***REQUIRED NODE MODULES***////////////////////////////////////////////////
const Discord = require("discord.js");
const Music = require('discord.js-musicbot-addon');
const Enmap = require("enmap");
const fs = require("fs");
const moment = require("moment"); 
const snekfetch = require('snekfetch');
const talkedRecently = new Set();
const star = new Discord.Client();
const starLog = console.log;
const config = require('./data/config.json');
const embeds = require('./data/embeds.json');
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

// Try local JSON config, if not, expect Process Env (Heroku)
try{
  star.config = require("./data/config.json");
} catch (e) {
  if(process.env.botToken) {
    ninja.config = {
      token: process.env.BOT_TOKEN,
      prefix: process.env.PREFIX,
      ownerid: process.env.OWNERID,
      dblToken: process.env.dblToken,
      dblToken2: process.env.sblToken2
    };
  } else {
    throw "NO CONFIG FILE FOUND, NO ENV CONF FOUND, EXITING";
  }
}

star.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
const embed = new Discord.RichEmbed()
 embed.setTitle("Thanks For Adding Me")
 embed.setColor(embeds.embedColor)
 embed.setTimestamp()
 embed.setDescription(embeds.guildDescrpt)
 embed.addField("About Me", "``star about`` Tells you some info about me")
 embed.addField("Setup Help", "``star setup`` Shows you how to properly set me up")
 embed.addField("Starboard Invite", `[Invite Me Here](${embeds.invLink})`)
 embed.addField("Starboard Support", `[Support Server](${embeds.helpLink})`)
 embed.setFooter(`${embeds.embedFooter}`, `${embeds.embedLink}`);

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

/* Code by Tyler. H#9393!! (☣ Tσxιƈ Dҽʋ ☣#7308)
 *  I DO NOT authorize you to use this bot or the corresponding code without my consent first.
 *  If you fork this Bot repo make sure you give me credit for all files and folders associated. 
 *  Due to the fact that no license is provided with this bot that means that it falls under the not publicly available category.
 * Unauthorized use of this bot could result in your GitHub and Discord accounts being terminated!
 */
