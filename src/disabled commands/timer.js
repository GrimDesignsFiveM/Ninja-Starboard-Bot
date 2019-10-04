//const Discord = module.require('discord.js');
//const ms = require('ms');

//module.exports.run = async (bot, message, args) => {

//  let Timer = args[0];

//  if(!args[0]){
 //   let tEmbed = new Discord.RichEmbed()
 //  .setTitle("Ninja Bot Timer")
//   .setDescription("Starts a timer based on the time given")
//  .setColor("#0x3dfbff")
 //  .addField(":x: " + "| Please Enter a time period followed by \"s or m or h\"")
//   .setFooter(`© Ninja Bot v1.00`);   
//   message.channel.send(tEmbed)
 //   return message.channel.send(tEmbed)

 // if(args[0] <= 0){
//	let tEmbed1 = new Discord.RichEmbed()
//   .setTitle("Ninja Bot Timer")
 //  .setDescription("Starts a timer based on the time given")
//   .setColor("#0x3dfbff")
 //  .addField(":x: " + "| Please Enter a time period followed by \"s or m or h\"")
 //  .setFooter(`© Ninja Bot v1.00`);   
//    return message.channel.send(tEmbed1);
 // 
//  message.channel.send(":white_check_mark: " + "| Timer Started for: " + `${ms(ms(Timer), {long: true})}`);

//  setTimeout(function(){
//let tEmbed4 = new Discord.RichEmbed()
 //  .setTitle("Ninja Bot Timer")
//   .setDescription("Starts a timer based on the time given")
 //  .setColor("#0x3dfbff")
//   .addField(` The Timer Has FINISHED!, it lasted: ${ms(ms(Timer), {long: true})}`)
//   .setFooter(`© Ninja Bot v1.00`);
 //   message.channel.send(message.author.toString() + tEmbed4)

 // }, ms(Timer));
//}

//exports.conf = {
 //   enabled: true,
 //   guildOnly: false,
 //   aliases: [],
//    permLevel: 0
//  };
  
//exports.help = {
 //   name: 'timer',
//    description: 'Create a timer.',
//    usage: 'timer'
 // });
//}
