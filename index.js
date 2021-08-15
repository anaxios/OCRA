const express = require("express");
const fs = require("fs");

const app = express();
const calendarArray = JSON.parse(fs.readFileSync("planner.json", "utf8"));
const newcalendarArray = calendarArray.map((e) => ({
  month: e.startDate.slice(4, 6),
  date: e.startDate.slice(6),
  summary: e.summary,
  description: e.description,
}));

app.get("/", (req, res) => {
  res.send("<h1>hello world!</h>");
});

app.get("/api/calendar", (req, res) => {
  const today = new Date();
  const [month, date] = [today.getMonth(), today.getDate()];

  let selection;
  if (req.query.NewCalendar) {
    selection = newcalendarArray.filter(
      (e) => parseInt(e.month) === month + 1 && parseInt(e.date) === date
    );
  } else {
    const ocDate = toOldCalendar(today.getYear(), month + 1, date);

    selection = newcalendarArray.filter(
      (e) =>
        parseInt(e.month) === ocDate.month && parseInt(e.date) === ocDate.date
    );
  }

  res.send(selection);
});

app.get("/api/calendar/:month/:date", (req, res) => {
  const selection = newcalendarArray.filter(
    (e) => e.month === req.params.month && e.date === req.params.date
  );

  res.send(selection);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

const toOldCalendar = (year, month, date) => {
  const currentDate = Date.now();
  const oneDay = 86400000; // in miliseconds not seconds
  const EpochTime = new Date(year, month, date);
  const ocEpochTime = EpochTime - oneDay * 13;
  const ocDay = new Date(ocEpochTime);
  return {
    yesr: ocDay.getYear(),
    month: ocDay.getMonth(),
    date: ocDay.getDate(),
  };
};

console.log(toOldCalendar("2021", "08", "16"));
