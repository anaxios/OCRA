class MyDate extends Date {
	// Constructor() {
	//     super();
	// }

	toJulian() {
		const oneDay = 86400000; // In miliseconds not seconds
		return this.valueOf() - (oneDay * 13);
	}
}

module.exports = MyDate;
