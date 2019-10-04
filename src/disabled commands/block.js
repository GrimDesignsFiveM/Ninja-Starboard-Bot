//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const moment = require('moment');
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../data/config.json");
const fs = require("fs");
const ms = require("ms");
const snekfetch = require('snekfetch');
const owner = config.ownerID

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {

    let id = args[0];
    if (!args[0]) return message.channel.send("Provide ID")
    let blocked = client.system.getBlocked()
    if (blocked[id]) delete blocked[id], send("Unblocking: "+id)
    else blocked[id] = true, send("Blocking: "+id)
    client.system.setBlocked(blocked)
}

exports.conf = {
  userPerm:["DEV"],
  botPerm:["SEND_MESSAGES"],
  category:"DevOnly",
  help:"Block a user or guild from the bot",
  args:"",
}
