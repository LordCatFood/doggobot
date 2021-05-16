const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class BalanceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'balance',
      aliases: ['bal'],
      usage: 'bal <@mention>',
      description: 'Check a user balance.',
      type: client.types.ECONOMY,
      examples: ['bal @LmabCatFood#0003']
    });
  }
  run(message, args, client, profileData) {
    let mention = message.mentions.members.first() || message.author
    let embed = new MessageEmbed()
    .setTitle(`${mention.tag}'s balance`)
    .addField('Doge Wallet:', profileData.dogecoins)
    .addField('Doge Bank:', profileData.dogebank)
    .setFooter('Discord support server: https://discord.gg/yDMRssSNdq')
    
    message.channel.send({embed: embed})
  }
};