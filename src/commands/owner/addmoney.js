const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class AddMoneyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'addmoney',
      aliases: ['addmoney','am'],
      usage: 'addmoney {@user} {amount}',
      description: 'Forcefully accelerates inflation by adding money to a player account.',
      type: client.types.OWNER,
      ownerOnly: true,
      examples: ['addmoney {@user} {amount}']
    });
  }
  run(message, args, client) {
    let user = message.mentions.users.first();
    if (!user) return message.channel.send("Please specify a user!");
    let amount = args[1];
    if (!amount || isNaN(amount)) return message.reply("Please specify a valid amount.");
    let data = client.eco.addMoney(user.id, parseInt(amount));
    const embed = new MessageEmbed()
        .setTitle(`Money Added!`)
        .addField(`User`, `<@${data.user}>`)
        .addField(`Balance Given`, `${data.amount} 💸`)
        .addField(`Total Amount`, data.after)
        .setColor("RANDOM")
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp();
    return message.channel.send(embed);

  } 
};