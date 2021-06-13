const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const settings = require('./settings.json');
require('./events/loader.js')(client);

client.on("ready", async () => {
client.user.setActivity(`Aequitas ❤️ V12 Altyapı`, { type: "STREAMING",url: "https://www.twitch.tv/aequitasgelişmişv12altyapı"})});

client.cooldowns = new Discord.Collection()
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komut/', (err, files) => { if (err) console.log(`Bir Komut Yüklemelisin!`);
console.log(`-> ${files.length} Komut Yükeniyor...`);
files.forEach(f => { let props = require(`./komut/${f}`);
client.commands.set(props.komut.name, props);
props.komut.aliases.forEach(alias => { client.aliases.set(alias, props.komut.name);});});});

client.reload = command => { return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./komut/${command}`)];
let cmd = require(`./komut/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => { if (cmd === command) client.aliases.delete(alias);});
client.commands.set(command, cmd);
cmd.komut.aliases.forEach(alias => { client.aliases.set(alias, cmd.komut.name);});
resolve(); } catch (e) { reject(e);}});};

client.load = command => { return new Promise((resolve, reject) => { try { let cmd = require(`./komut/${command}`);
client.commands.set(command, cmd);
cmd.komut.aliases.forEach(alias => { client.aliases.set(alias, cmd.komut.name);});
resolve(); } catch (e) { reject(e); }});};

client.unload = command => { return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./komut/${command}`)];
let cmd = require(`./komut/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => { if (cmd === command) client.aliases.delete(alias);});
resolve(); } catch (e) {reject(e); }});};


client.login(process.env.token).then(() => {
console.log(`
∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
Bot: ${client.user.username}#${client.user.discriminator}
ID: ${client.user.id}
Prefix: ${settings.bot.prefix}
∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞`);});

//∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞\\
