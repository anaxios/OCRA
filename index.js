const express = require('express');
const fs = require('fs');

const app = express();
const calendarArray = JSON.parse(fs.readFileSync('planner.json', 'utf8'));
const newcalendarArray = calendarArray.map(e =>({month: e.startDate.slice(4,6), 
                                                day: e.startDate.slice(6), summary: e.summary, description: e.description}));
console.log(newcalendarArray);

app.get('/', (req, res) => {
    res.send('<h1>hello world!</h>');
});

app.get('/api/calendar/:month/:day', (req, res) => {
 const monthDay = req.params.month + req.params.day;
 const selection = newcalendarArray.filter((e) => e.month === req.params.month && e.day === req.params.day);

    res.send(selection);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
})