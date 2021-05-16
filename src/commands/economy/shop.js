const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class DepositCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shop',
      aliases: ['store'],
      description: 'View the store!',
      type: client.types.ECONOMY,
    });
  }
  async run(message, args, client, profileData) {
    const embed = new MessageEmbed()
        .setTitle('Store')
        .setDescription(`In testing.`)
        .setTimestamp();
	message.channel.send(embed)
  }
};