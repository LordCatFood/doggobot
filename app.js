const config = require('./config.json');
const Client = require('./src/Client.js');
const { Intents, Collection } = require('discord.js');

global.__basedir = __dirname;

// Client setup
const intents = new Intents();
intents.add(
  'GUILDS',
  'GUILD_VOICE_STATES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS',
  'GUILD_MEMBERS'
);
const client = new Client(config, { ws: { intents: intents } });

// Initialize client
function init() {
  client.loadEvents('./src/events');
  client.loadCommands('./src/commands');
  client.login(client.token);
  //Put your token in config.json
  //To change prefix, go to: src/utils/db.js, go to line 21 and change "f!" to anything you want if you have not run the project yet. If you have run the project, delete all the sqlite files in the data folder before you change the prefix.
}

client.mongoose.connect(client.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    auth: {authdb:"admin"}
}).then(() => {
    client.logger.info('Mongoose successfully linked to database!')
}).catch((err) => client.logger.error(err))

init();

process.on('unhandledRejection', err => client.logger.error(err));

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Telecom is online!');
});
server.listen(3000);