/* eslint radix: ["error", "as-needed"] */
'use strict';
const express = require('express');
const fs = require('fs');
const julianDate = require('./Classes/JulianDate');
// Const Route = require('./Classes/Route');

const app = express();

const calendarDatabase = JSON.parse(fs.readFileSync('calendar_database.json', 'utf8'));

app.get('/api/calendar', (req, res) => {
	const today = new Date();
	const [month, date] = [today.getMonth(), today.getDate()];

	let selection;
	if (req.query.NewCalendar === 'true') {
		selection = calendarDatabase.filter(
			e => parseInt(e.month) === month + 1 && parseInt(e.date) === date,
		);
	} else {
		const julianToday = julianDate.toJulian(today); // Hacky way to get old calendar current date.
		console.log(julianToday);
		selection = calendarDatabase.filter(
			e =>
				parseInt(e.month) === julianToday.getMonth() + 1
        && parseInt(e.date) === julianToday.getDate(),
		);
	}

	if (!selection || selection.length === 0) {
		return res.status(404).send('Date not found.');
	}

	res.send(selection);
});

app.get('/api/calendar/:month/:date', (req, res) => {
	const selection = calendarDatabase.filter(
		e => e.month === req.params.month && e.date === req.params.date,
	);

	if (!selection || selection.length === 0) {
		return res.status(404).send('Date not found.');
	}

	res.send(selection);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
