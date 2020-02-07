import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

let app = express() // You can also use Express

app.use(express.json())

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
