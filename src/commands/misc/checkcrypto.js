const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const request = require('request')

module.exports = class CryptroCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'checkcrypto',
      aliases: ['checkcrypto', 'checkcryp'],
      usage: 'checkcrypto ETH',
      description: 'Checks the value of the mentioned crypto. Must be in abbreviation, or command will return errors.',
      type: client.types.MISC,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
      examples: ['checkcrypto BTC']
    });
  }
  async run(message, args, bot) {
    message.delete()
    let cryptoCurrency = args[0].toUpperCase()
    let symbol = args[1] ? args[1].toUpperCase() : 'USD'
    request(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoCurrency}&tsyms=${symbol}`, function(err, response, body) {
      if (err) {
        message.reply('```' + err + '```Please, report this error on github with a screenshot https://github.com/LucasCtrl/CryptoBot/issues/new')
        return
      }
      try {
        let data = JSON.parse(body)
        if (!data[symbol]) {
          message.reply('Please select a correct currency (BTC, DOGE, ETH, ...) or symbol (USD, EUR, ...)').then(m => { setTimeout(() => { m.delete() }, 5000) })
        } else {
          message.reply(`1 ${cryptoCurrency} costs ${data[symbol]} ${symbol}`)
        }
      } catch (err) {
        message.reply('```' + err + '```Please select a correct currency (BTC, DOGE, ETH, ...) or symbol (USD, EUR, ...) or report this error on github with a screenshot https://github.com/LucasCtrl/CryptoBot/issues/new')
      }
    })
  }
};