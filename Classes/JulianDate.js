class JulianDate {
	static toJulian(date) {
		const ConvertedDate = date.getTime() - (86400000 * 13);
		return new Date(ConvertedDate);
	}
}

module.exports = JulianDate;
