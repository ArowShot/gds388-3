import { games } from '../_gamedb'

export let get = async (req, res) => {
	const { id } = req.params;
	let game = games.filter(game => game._id == id)
	if(game.length == 1) {
		res.json(game[0])
	} else {
		res.status(404)
		res.json({error:`game with id ${id} not found`})
	}
}

export let put = async (req, res) => {
	const { id } = req.params;
	let gameIndex = games.findIndex(game => game._id == id)
	if(gameIndex >= 0) {
		games[gameIndex] = {
			_id: games[gameIndex]._id,
			title: req.body.title,
			genre: req.body.genre,
			description: req.body.description
		}
		res.json(games[gameIndex])
	} else {
		res.status(404)
		res.json({error:`game with id ${id} not found`})
	}
}

export let del = async (req, res) => {
	const { id } = req.params;
	let gameIndex = games.findIndex(game => game._id == id)
	if(gameIndex >= 0) {
		games.splice(gameIndex, 1)
		res.json(games[gameIndex])
	} else {
		res.status(404)
		res.json({error:`game with id ${id} not found`})
	}
}