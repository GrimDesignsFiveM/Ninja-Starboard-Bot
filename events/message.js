const Discord = require('discord.js');
const config = require("../data/config.json")

module.exports = (star, message) => {
    if (message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;


    let blEmbed = new Discord.RichEmbed()
        .setTitle(":no_entry: Blacklisted User :no_entry:")
        .setColor("0xff0000")
        .setTimestamp()
        .setDescription(`<@${message.author.id}> Sorry you are blacklisted from using my services`)
        .addField("Possible Reasons", "API Abuse, Spamming Request & Bug Report Commands **OR** Breach Of Our T.O.S")
        .addField("Resolve This Issue", "[Contact Us](https://discord.gg/gP2gZGK)")
        .setFooter("Ninja Gen")

    let bEmbed = new Discord.RichEmbed()
        .setTitle(":no_entry: Blacklisted User :no_entry:")
        .setColor("0xff0000")
        .setTimestamp()
        .setDescription(`<@${message.author.id}> Sorry you are blacklisted from using my services`)
        .addField("Blacklist Reason", "General Disrespect and Spam Ping!! FUCK YOU!!!")
        .addField("Blacklist Length", "Permanent, You have also been banned from my support server :shrug:")
        .setFooter("Ninja Gen")

    let sEmbed = new Discord.RichEmbed()
        .setTitle(":no_entry: Blacklisted Server :no_entry:")
        .setColor("0xff0000")
        .setTimestamp()
        .setDescription(`<@${message.author.id}> Sorry but I am blacklisted from this server`)
        .addField("Blacklist Reason", "Not a general purpose/bot list bot!!")
        .setFooter("Ninja Gen")



    /* //Blacklisted Users
       if (message.author.id == "368016588898697218") {
        console.log(`[BlackList] ${message.author.tag} tried to use a command!`);
       // return message.channel.send(`[Ninja Gen BlackList] ${message.author.tag} You are blacklisted from using my services :shrug:`);
       return message.channel.send(blEmbed);
    }
       
       if (message.author.id == "368891159948427284") {
        console.log(`[BlackList] ${message.author.tag} tried to use a command!`);
       // return message.channel.send(`[Ninja Gen BlackList] ${message.author.tag} You are blacklisted from using my services :shrug:`);
       return message.channel.send(bEmbed);
    }

     //Blacklisted Users
       if (message.author.id == "482283258441105420") {
        console.log(`[BlackList] ${message.author.tag} tried to use a command!`);
       // return message.channel.send(`[Ninja Gen BlackList] ${message.author.tag} You are blacklisted from using my services :shrug:`);
       return message.channel.send(blEmbed);
    } */


    //Channels blacklist
    //if (message.channel.id == "") return;

    //Servers blacklist
    /*if (message.guild.id == "264445053596991498") {
        console.log(`[BlackList] ${guild.name} I am blacklisted from this guild `);
       // return message.channel.send(`[Ninja Gen BlackList] ${message.author.tag} You are blacklisted from using my services :shrug:`);
       return message.channel.send(sEmbed);
    } */

    star.message = message;

let cmdEmbed = new Discord.RichEmbed()
    .setTitle(":no_entry: Command Error :no_entry:")
    .setColor("0xff0000")
    .setTimestamp()
    .setDescription(`<@${message.author.id}> Sorry that command doesn't exist :shrug:`)

    const args = message.content.slice(star.config.prefix.length).trim().split(/ +/g);
    //console.log(args);
    const command = args.shift().toLowerCase();
    //console.log(command);
    const cmd = star.commands.get(command);
    //console.log(cmd);
    if (!cmd) return message.channel.send(cmdEmbed);

    //console.log(cmd);
    cmd.run(star, message, args);
};
