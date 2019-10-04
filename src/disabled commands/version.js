const { version } = require("../package");


//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {

const versionLink = await fetch("https://raw.githubusercontent.com/GrimDesignsFiveM/NinjaBot2.0/master/package.json?token=ALJF5UZA2CRNQTD2SNWUY2S5KWJH4");
const json = await request.json();
const versionCheck = require(`${VersionLink}`);

const fetch = require("node-fetch");
const pkg = require("../package");

    return {
        sameVer: json.version === pkg.version,
        originVer: json.version
    };
};
    const embed = {
        title: "Version Check",
        fields: [
            {
                name: "Local version",
                value: version,
                inline: true
            }
        ]
    };
    versionCheck().then(ver => {
        embed.fields.push({
            name: "Latest version",
            value: ver.originVer,
            inline: true
        });

        if (ver.sameVer) embed.color = 0x00ff00;
        else embed.color = 0xff0000;

        message.channel.send({ embed });
    });

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


module.exports.info = {
    description: "Shows the current version of DiscordCaptcha",
    args: [ ]
};
