const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');

module.exports = class ServersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'servers',
      aliases: ['servs'],
      usage: 'servers',
      description: 'Displays a list of Froggy\'s joined servers.',
      type: client.types.OWNER,
      ownerOnly: true
    });
  }
  run(message, args, bot) {

    let description =
          `Total Servers - ${bot.guilds.cache.size}\n\n` +
          bot.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
            .slice(0, 100)
            .join("\n");

        //bot.totalMembers = bot.totalMembers + description

        message.channel.send("```" + description + "```", { split: { char: '\n' } })
  }
};
