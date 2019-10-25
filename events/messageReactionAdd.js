async function starEmbed(color, description, author, thumbnail, timestamp, footer) {
 const Discord = require('discord.js');
  const client = new Discord.Client();
    const embed = {
        "author": {
            "name": `Ninja Hall Of Fame`,
            "icon_url": "https://i.imgur.com/NSHqjRM.jpg",
            "url": "https://ninja-bot.webnode.com/",
        },
        "color": color,
        "description": "The following message has been starred",
        "fields": [{
        name: "Starred User",
        value: author
      },
      {
        name: "Starred Message",
        value: description
      }
      ],
        "thumbnail": {
            "url": thumbnail
        },
        "timestamp": timestamp,
        "footer": {
            "text": footer
        }
    };
    return embed;
}

module.exports = async (client, reaction, user) => {
const Discord = require('discord.js');
const message = reaction.message;
const config = require('../data/config.json');
const embed2 = new Discord.RichEmbed()

     embed2.setTitle("Ninja Starboard Channel")
      embed2.setColor(config.embedColor)
       embed2.setDescription("You do not have a ``ninja-starboard`` channel so i have created one for you and placed it at the top of the channel list, Move it where ever you wish")
        embed2.addField("Note", "To post the message you reacted to you will have to remove the reaction and do it again")
        embed2.setFooter("© Ninja Starboard Bot")  

    const starboardChannel = reaction.message.guild.channels.find("name", "ninja-starboard");
         if (!message.guild.channels.exists("name", "ninja-starboard")) return reaction.message.channel.send(embed2) .then(message.guild.createChannel("ninja-starboard", "text"))       
         //if(!message.guild.channels.exists("name", "ninja-starboard")) return reaction.message.channel.send("Nope")
    try {
        if(reaction.emoji.name !== "⭐") return console.log('1');
        const fetch = await starboardChannel.fetchMessages({ limit: 100 }).then(console.log('2'));
        const stars = fetch.find(m => m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(message.id));
        if(stars) {
            const star = /\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/g.exec(stars.embeds[0].footer.text);
            const _star = stars.embed[0];
            const embed = await starEmbed(_star.title, _star.color, _star.description, _star.author.name, _star.thumbnail.url, _star.createdTimestamp, `⭐ ${parseInt(star[1]+1)} | ${message.id}`);
            const starMsg = await starboardChannel.fetchMessages(stars.id);
            await starMsg.edit({ embed }).then(console.log('8'))
        }
    if(!stars) {
        //if(!message.guild.channels.exists("name", "ninja-starboard")) throw `It appears that you do not have a ninja-starboard channel.`
        const embed = await starEmbed(15844367, message.cleanContent, message.author.tag, message.author.displayAvatarURL, new Date(), `⭐ 1 | ${message.id}`);
        await starboardChannel.send({ embed });
    }
} catch (error) {
    console.log(error);
  }
};
