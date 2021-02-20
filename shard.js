const { ShardingManager } = require(`discord.js`)

const shards = new ShardingManager(`./aequitas.js`, {
token : process.env.token,
totalShards : 1 }); //1000 Sunucuda Bir Shard Aç Knk (:
shards.spawn()
