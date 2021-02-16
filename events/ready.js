const Discord = require('discord.js');

module.exports = client => {
  console.log(`
∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
         ${client.user.username}
∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
`);
client.on("ready", () => {
  client.user.setPresence({
    game: {
      name: "Aequitas v12 altyapı",
      type: "WATCHING"
      // url: 'https://www.twitch.tv/amerikaniks'
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
  });
});
