const fetch = require('node-fetch')

function randint(min, max) {
	// inclusive of min and max
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomMeme() {
	return fetch('https://www.reddit.com/r/blackpeopletwitter/top.json')
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
