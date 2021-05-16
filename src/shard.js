const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./Client.js', { token: 'ODMxNzgyNTc4NzE2OTM0MTc1.YHaP5A.BIQKQhgbHE-84mNgdlLkgwqKhDQ' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();