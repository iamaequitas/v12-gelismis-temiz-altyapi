const Discord = require('discord.js');
module.exports = client => {
 
client.on("ready", () => {
client.user.setPresence({
game: {
name: "Aequitas v12 gelişmiş temiz altyapı",
type: "WATCHING",
url: 'https://www.twitch.tv/aequitasaltyapı'
// Değerler:
// PLAYING: Oynuyor
// WATCHING: İzliyor
// LISTENING: Dinliyor
},
status: "idle"
// Değerler:
// online: Çevrimiçi
// dnd: Rahatsız Etmeyin
// idle: Boşta
});});}
