const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
let cooldown = {}

module.exports = class WithdrawCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'withdraw',
      aliases: ['with'],
      usage: 'with <Amount>',
      description: 'Withdraw your dogecoin from your account!',
      type: client.types.ECONOMY,
      examples: ['withdraw 1000']
    });
  }
  async run(message, args, client, profileData) {
    const profileModel = require('../../models/profileSchema')
    
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
    try {
      if (amount > profileData.dogebank) return message.channel.send(`You don't have that amount of coins to deposit`);
        
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            dogecoins: amount,
            dogebank: -amount,
          },
        }
      );
	coinCache[message.author.id] = null
      return message.channel.send(`You withdrew ${amount} dogecoins into your bank`);
    } catch (err) {
      console.log(err);
    }
  }
};