import { games } from './_gamedb'

export let get = async (req, res) => {
	res.json(games)
}

function checkParamNotEmpty(obj, param) {
	return obj && obj[param] && obj[param] != ""
}

export let post = async (req, res) => {
    console.log(req.body)
	if(
		!checkParamNotEmpty(req.body, "title") ||
		!checkParamNotEmpty(req.body, "genre") ||
		!checkParamNotEmpty(req.body, "description")
	) {
		res.status(405)
		res.json({
			error: "Missing property"
		})
	} else {
		let game = {
			_id: Math.random(),
			title: req.body.title,
			genre: req.body.genre,
			description: req.body.description
		}
		games.push(game)
		res.json(game)
	}
}