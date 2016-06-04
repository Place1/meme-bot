const fetch = require('node-fetch')
const Promise = require('es6-promise').Promise

function randint(min, max) {
	// inclusive of min and max
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const memeSources = [
	'https://www.reddit.com/r/blackpeopletwitter/top.json',
	'https://www.reddit.com/r/me_irl/top.json',
	'https://www.reddit.com/r/memes/top.json'
]

function getRandomMeme() {
	return Promise.all(memeSources.map(meme => fetch(meme)))
		.then(results => {
			var chosen = randint(0, results.length -1)
			return results[chosen]
		})
		.then(res => res.json())
		.then(json => {
			var chosen = randint(0, json.data.children.length - 1)
			return json.data.children[chosen].data.url
		})
		.catch(function(err) {
			return err
		})
}

module.exports = function(robot) {

	robot.hear(/i'm tilting/, res => {
		getRandomMeme()
			.then(meme => {
				return res.send(meme)
			})
	})

}
