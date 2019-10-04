//These are the required node modules, DO NOT touch these.
const Discord = require("discord.js");
const Music = require('discord.js-musicbot-addon');
const Enmap = require("enmap");
const fs = require("fs");
const snekfetch = require('snekfetch');
const talkedRecently = new Set();
const token = process.env.BOT_TOKEN; //Replace with config.token if self hosting and define the token in the config. 
const client = new Discord.Client();
const config = require('../data/config.json');
const adlinks = require('../data/blacklistedlinks.json');
const offensivewords = require('../data/blacklistedwords.json');
const profanities = require('../data/blacklistedswears.json');
const antispam = require('discord-anti-spam');
//const mysql = require('mysql');
//const file = require('../mysql.json');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const queue = new Map();
const ytdl = require('ytdl-core');
const fetchViedoInfo = require('youtube-info');
const music = require('../music.js');

//This SHOULD allow us to use the "client, message & args" async functions.(Example: message.author.id)
exports.run = async (client, message, args) => {

        // get the current guild for the voice channel
        if (!guilds[message.guild.id]) {
            guilds[message.guild.id] = {
                queue: [],
                queueNames: [],
                isPlaying: false,
                dispatcher: null,
                voiceChannel: null,
                skipReq: 0,
                skippers: [],
            };
            music.writeGuilds(guilds);
        }

        let videoName = args.join(' ');
        console.log(guilds[message.guild.id]);

        if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
            if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
                music.getID(videoName, (id) => {
                    if (!id) {
                        return message.reply(', no video include that name!');
                    }
                    music.addToQueue(id, guilds[message.guild.id]);
                    fetchViedoInfo(id, (err, videoInfo) => {
                        if (err) {
                            throw new Error(err);
                        }
                        message.reply(' added to queue: **' + videoInfo.title + '**');
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                        music.writeGuilds(guilds);
                    });
                });
            }
            else {
                guilds[message.guild.id].isPlaying = true;
                music.getID(videoName, (id) => {
                    if (!id) {
                        return message.reply(', no video include that name!');
                    }
                    guilds[message.guild.id].queue.push(id);
                    music.playMusic(id, message, guilds[message.guild.id]);
                    fetchViedoInfo(id, (err, videoInfo) => {
                        if (err) {
                            throw new Error(err);
                        }
                        message.reply(' added to queue: **' + videoInfo.title + '**');
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                        music.writeGuilds(guilds);
                    });
                });
            }
        }
        else {
            return message.reply('please join a voice channel first!');
        }
    }
module.exports = {   
    name: 'play',
    description: 'plays a specific music from youtube',
    usage: '[youtube video link or video name]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (message.channel.type !== 'text') return;
}
