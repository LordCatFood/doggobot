const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reply',
      aliases: ['reply', 'rep'],
      usage: 'reply <message>',
      description: 'Replies to a user who is appealing bans',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      examples: [',reply Hi there! We have decided to reject this appeal!']
    });
  }
  async run(message, args, bot) {
    const db = bot.qdb

    if (message.author.bot) return;

    var table = new db.table("Tickets");
    var support = await table.get(`supportChannel_${message.channel.id}`);
    if (support) {
      var support = await table.get(`support_${support}`);
      let supportUser = client.users.cache.get(support.targetID);
      if (!supportUser) return message.channel.delete();
      let isBlock = await table.get(`isBlocked${suppport.targetID}`);

      if (isBlock === true) return message.channel.send("The user is blocked. Unblock them to continue or close the ticket.")
      var args = message.content.split(" ").slice(1)
      let msg = args.join(" ");
      message.react("✅");
      return supportUser.send(`Moderation Staff | ${msg}`);
    }
  }
};