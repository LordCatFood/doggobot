const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class AddMembersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'addmembers',
      usage: 'addmembers',
      description: 'Forces cache to update',
      type: client.types.OWNER,
      ownerOnly: true,
      examples: ['addmembers']
    });
  }
  run(message, args, bot) {
    bot.totalMembers = 0

    bot.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .map(r => r)
      .map((r, i) => bot.totalMembers = bot.totalMembers + r.memberCount)
      .slice(0, 100)
      .join("\n");

  } 
};
