const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
let cooldown = {}

module.exports = class DepositCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'deposit',
      aliases: ['dep'],
      usage: 'deposit <Amount>',
      description: 'Deposit your dogecoin into your account!',
      type: client.types.ECONOMY,
      examples: ['deposit 1000']
    });
  }
  async run(message, args, client, profileData) {
    const profileModel = require('../../models/profileSchema')
    
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
    try {
      if (amount > profileData.dogecoins) return message.channel.send(`You don't have that amount of coins to deposit`);
        
      let coinCache = {}
      coinCache[message.author.id] = profileData.dogecoins
      let coins = coinCache[message.author.id] - amount
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            dogecoins: -amount,
            dogebank: amount,
          },
        }
      );
	coinCache[message.author.id] = null
      return message.channel.send(`You deposited ${amount} dogecoins into your bank`);
    } catch (err) {
      console.log(err);
    }
  }
};