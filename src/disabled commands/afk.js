//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../data/config.json");
const fs = require("fs");
const snekfetch = require('snekfetch');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {
 
let reason = args.join(' ') ? args.join(' ') : 'I am currently afk, I will reply as soon possible.';
    let afklist = client.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            reason: reason
        };

        client.afk.set(message.author.id, construct);
        return message.reply(`you have been set to afk for reason: ${reason}`).then(msg => msg.delete(5000));
    }

if (message.content.includes(message.mentions.users.first())) {
    let mentioned = client.afk.get(message.mentions.users.first().id);
    if (mentioned) message.channel.send(`**${mentioned.usertag}** is currently afk. Reason: ${mentioned.reason}`);
  }

};

module.exports.help = {
    name: 'afk'
};
