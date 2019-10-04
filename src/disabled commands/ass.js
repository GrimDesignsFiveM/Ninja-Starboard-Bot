//This is the bots required node modules, certain aspects of the code will not work without this.
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone : true,
  fetchAllMembers : true
});
 
const config = require("../data/config.json");
const fs = require("fs");
const snekfetch = require('snekfetch');
const errors = require('../src/errors/errors.json');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (message, args) => {
            const res = await snekfetch.get(`http://api.obutts.ru/butts/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.obutts.ru/${preview}`;

            const embed = new Discord.MessageEmbed()
                .setFooter('http://obutts.ru/')
                .setImage(image)
                .setColor('#CEA0A6');
            return message.channel.send({ embed });
        }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'apply',
  description: 'Gives the user the option to apply to our staff team.',
  usage: 'opt-in'
};
