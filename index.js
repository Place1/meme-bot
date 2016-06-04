require('coffee-script/register') // so we can require hubot;
const Hubot = require('hubot')
const path = require('path')

const adapterPath = path.resolve(__dirname, '../')
const adapterName = process.env.ADAPTER || 'shell' // from hubot-facebook
const enableHttpd = true
const botName = 'meme-bot'
const botAlias = '/'

const robot = new Hubot.Robot(adapterPath, adapterName, enableHttpd, botName, botAlias)

// load the scripts directory into the bot
robot.adapter.once('connected', function() {
	robot.load(path.resolve(__dirname, 'scripts'))
})

// run the bot
robot.run()
