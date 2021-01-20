const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
require('./events/eventLoader.js')(client);
var prefix = ayarlar.prefix;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komut/', (err, files) => {
    if (err) console.error(err);
    console.log(`
 -> ${files.length} Komut Yükeniyor... <-
`);
    files.forEach(f => {
        let props = require(`./komut/${f}`);
        console.log(`-> ${props.help.name}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komut/${command}`)];
            let cmd = require(`./komut/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komut/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
              client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komut/${command}`)];
            let cmd = require(`./komut/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
  if (message.member.hasPermission("MANAGE_NICKNAMES")) permlvl = 1;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("MANAGE_ROLES")) permlvl = 4;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 6;
  if (message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g
client.login(process.env.token);
//∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞\\
