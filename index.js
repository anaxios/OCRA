const express = require('express');
const fs = require('fs');
const MyDate = require('./Date');

const app = express();
const calendarArray = JSON.parse(fs.readFileSync('planner.json', 'utf8'));
const newcalendarArray = calendarArray.map(e => ({
	month: e.startDate.slice(4, 6),
	date: e.startDate.slice(6),
	summary: e.summary,
	description: e.description,
}));

app.get('/', (req, res) => {
	res.send('<h1>hello world!</h>');
});

app.get('/api/calendar', (req, res) => {
	const today = new MyDate();
	const [month, date] = [today.getMonth(), today.getDate()];

	let selection;
	if (req.query.NewCalendar === 'true') {
		selection = newcalendarArray.filter(
			e => parseInt(e.month) === month + 1 && parseInt(e.date) === date,
		);
	} else {
		const julianToday = new MyDate(today.toJulian());
		selection = newcalendarArray.filter(
			e =>
				parseInt(e.month) === julianToday.getMonth() + 1
        && parseInt(e.date) === julianToday.getDate(),
		);
	}

	res.send(selection);
});

app.get('/api/calendar/:month/:date', (req, res) => {
	const selection = newcalendarArray.filter(
		e => e.month === req.params.month && e.date === req.params.date,
	);

	res.send(selection);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
