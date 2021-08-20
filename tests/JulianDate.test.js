const julianDate = require('../Classes/JulianDate');

process.env.NODE_ENV = 'test';

const today = new Date();
const converted = julianDate.toJulian(today);

describe('JulianDate', () => {
	test('conver date object to Julian date', () => {
		expect(converted.getTime()).toBe((today.getTime() - (86400000 * 13)));
	});
});
