const { Discord, MessageEmbed } = require("discord.js");
const settings = require('../settings.json');
module.exports = message => {

let cmd;
let client = message.client;
if (message.author.bot) return;
if (!message.content.startsWith(settings.bot.prefix)) return;
let command = message.content.split(' ')[0].slice(settings.bot.prefix.length);
let params = message.content.split(' ').slice(1);
if (client.commands.has(command)) { cmd = client.commands.get(command) } else if (client.aliases.has(command)) { cmd = client.commands.get(client.aliases.get(command)) }

if (cmd) {
if (client.cooldowns.has(`${command}_${message.author.id}`)) {
const finish = client.cooldowns.get(`${command}_${message.author.id}`)
const date = new Date();
const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
return message.delete() & message.channel.send(new MessageEmbed().setDescription(`Bu komudu tekrardan kullanabilmek için \`${kalan}\` saniye beklemeniz gerekmektedir.`).setColor("RED")).then(x => x.delete({ timeout: 2000 }))};
        
const finish = new Date();
finish.setSeconds(finish.getSeconds() + cmd.komut.cooldown);
cmd.run(client, message, params);

if (cmd.komut.cooldown > 0) {
client.cooldowns.set(`${command}_${message.author.id}`, finish);
setTimeout(() => { client.cooldowns.delete(`${command}_${message.author.id}`)}, cmd.komut.cooldown * 1000)}}};
