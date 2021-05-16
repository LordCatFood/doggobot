const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const request = require('request')

module.exports = class MarketCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'marketcap',
      aliases: ['marketcap', 'mc'],
      usage: 'marketcap ETH',
      description: 'Gets the market cap of the currency mentioned.',
      type: client.types.MISC,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
      examples: ['marketcap BTC']
    });
  }
  async run(message, args, bot) {
    message.delete()
    let symbol = args[0] ? args[0].toUpperCase() : 'USD'
    request(`https://min-api.cryptocompare.com/data/exchange/histoday?tsym=${symbol}&limit=1`, function(err, response, body) {
      if (err) {
        message.reply('```' + err + '```Please, report this error on github with a screenshot https://github.com/LucasCtrl/CryptoBot/issues/new')
        return
      }
      try {
        let data = JSON.parse(body)
        if (!data) {
          message.reply('Please select a correct symbol (USD, EUR, ...)').then(m => { setTimeout(() => { m.delete() }, 5000) })
        } else {
          message.reply(`Total marketcap: ${data.Data[0].volume} ${symbol}`)
        }
      } catch (err) {
        message.reply('```' + err + '```Please select a correct symbol (USD, EUR, ...) or report this error on github with a screenshot https://github.com/LucasCtrl/CryptoBot/issues/new')
      }
    })
  }
};