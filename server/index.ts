import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { json as bodyParser, urlencoded } from 'body-parser';
import cors from 'cors';
import config from './config';
import router from './routes';
import logRequestStart from './request.log';

const connectionString = process.env.MONGODB_URL || config.MONGODB_URL;

mongoose.connect(
	connectionString,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	},
	(err) => {
		if (err) {
			console.log(`Error connecting to MongoDB: ${err}`);
		}
	}
);

const app = express();
const CORS = cors();

app.use(CORS);
app.use(
	urlencoded({
		extended: true,
	})
);
app.use(bodyParser());
app.use(logRequestStart);

app.use(express.static(path.join(__dirname, '../')));

app.get('*', (_req, res) => {
	res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.use('/api', router);

const port = process.env.PORT || 3005;

app.listen(port, () => {
	console.log(`Co2 analyzer connected at port ${port}`);
});
