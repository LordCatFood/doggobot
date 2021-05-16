const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
let cooldown = {}

module.exports = class BegCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'beg',
      usage: 'beg',
      description: 'Beg for coins from a rando on the street.',
      type: client.types.ECONOMY,
      examples: ['beg']
    });
  }
  async run(message, args, client, profileData) {
    let profileSchema = require('../../models/profileSchema')
      
    let d = new Date();
    let unix = d.getTime();
    let userID = message.author.id
    let dogecoins = Math.floor(Math.random() * 501)
    
    if (cooldown[message.author.id] > unix) {
        let cooldownEmbed = new MessageEmbed()
        .setTitle("We aren't made of money, slow down!")
        .setDescription(`Hey man, chill with the begging! Please wait ${(cooldown[message.author.id] - unix)/1000} more seconds!`)
        return message.channel.send({embed: cooldownEmbed});
    };
    
    const result = await profileSchema.findOneAndUpdate(
        {
          userID,
        },
        {
          userID,
          $inc: {
            dogecoins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )
    let people = ['Cardi B', 'Dr. Dre', 'Eminem', 'A random cat']
    let messages = ['Here, have some epic dogecoins', 'You should work for your money usually, but fine.', 'Poor homeless man! Here, take some dogecoins!']
    
	cooldown[message.author.id] = unix + 40000;
    let successEmbed = new MessageEmbed()
    .setTitle(people[Math.floor(Math.random() * 3)])
    .setDescription(messages[Math.floor(Math.random() * 2)])
    .setFooter(`You have gotten ${dogecoins} coins!`)
    message.channel.send({embed: successEmbed})
  }
};