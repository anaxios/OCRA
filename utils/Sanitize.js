class Sanitize {
	get valueOf() {
		return this.x;
	}

	run(param) {
		return param.replace(/\\n/g, '\n').replace(/\\"/g, '\"').replace(/---/g, '\:');
	}
}

module.exports = Sanitize;

const sanitize = new Sanitize();
const fs = require('fs');

const newcalendarArray = JSON.parse(fs.readFileSync('calendar_database.json', 'utf8'));
// Const newcalendarArray = calendarArray.map(e => ({
// 	month: e.startDate.slice(4, 6),
// 	date: e.startDate.slice(6),
// 	summary: e.summary,
// 	description: sanitize.run(e.description),
// }));

/* const newObject = newcalendarArray.map(e => ({
	month: e.month,
	date: e.date,
	summary: e.summary,
	fastRank: e.description.substring(e.description.search(/Saints and Feasts:/g) + 'Saints and Feasts: '.length, e.description.search(/\n\nEpistle Reading:/g)).split('\n\n')[1],
	saintsAndFeast: e.description.substring(e.description.search(/Saints and Feasts:/g) + 'Saints and Feasts: '.length, e.description.search(/\n\nEpistle Reading:/g)).split('\n\n')[0],
	epistle: e.description.substring(e.description.search(/Epistle Reading:/g) + 'Epistle Reading: '.length, e.description.search(/\n\nGospel Reading:/g)),
	gospel: e.description.substring(e.description.search(/Gospel Reading:/g) + 'Gospel Reading: '.length, e.description.search(/\n\n$/g)),
})); */

// Fs.writeFileSync('./new_planner.json', JSON.stringify(newObject));
// console.log(newObject);

