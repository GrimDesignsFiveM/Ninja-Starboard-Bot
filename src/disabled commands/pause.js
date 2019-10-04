//These are the required node modules, DO NOT touch these.
const Discord = require("discord.js");
const Music = require('discord.js-musicbot-addon');
const Enmap = require("enmap");
const fs = require("fs");
const snekfetch = require('snekfetch');
const talkedRecently = new Set();
const token = process.env.BOT_TOKEN; //Replace with config.token if self hosting and define the token in the config. 
const client = new Discord.Client();
const config = require('./data/config.json');
const adlinks = require('./data/blacklistedlinks.json');
const offensivewords = require('./data/blacklistedwords.json');
const profanities = require('./data/blacklistedswears.json');
const antispam = require('discord-anti-spam');
//const mysql = require('mysql');
//const file = require('../mysql.json');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const ytdl = require('ytdl-core');
const fetchViedoInfo = require('youtube-info');
const music = require('../music.js');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {
    name: 'pause',
    description: 'pause the current song that is playing',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let server = guilds[message.guild.id];
        music.pauseSong(message, server);
    },
};
