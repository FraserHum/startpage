const zeroFill = n => {
	return ('0' + n).slice(-2);
}

const interval = setInterval(() => {
	const now = new Date();

	const dateTime = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());

	document.getElementById("Date").innerHTML = dateTime;
}, 100);