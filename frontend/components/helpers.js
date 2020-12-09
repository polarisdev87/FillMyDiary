const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

function getNumberWithOrdinal(n) {
	var s = ["th", "st", "nd", "rd"],
		v = n % 100;
	return s[(v - 20) % 10] || s[v] || s[0];
}

export function autoParagraph(html) {
	html = "<p>" + html.split(/\n/).join("</p>\n<p>") + "</p>";
	return html;
}

export function convertDate(date) {
	date = new Date(date);
	date = {
		day: date.getDate(),
		month: date.getMonth() + 1,
		monthIndex: date.getMonth(),
		monthString: months[date.getMonth()],
		ordinal: getNumberWithOrdinal(date.getDate()),
		year: date.getFullYear()
	};
	return date;
}

export function decodeHTML(html) {
	html = html.replace("amp;", "");
	return html.replace(/&#(\d+);/g, function(match, dec) {
		return String.fromCharCode(dec);
	});
}

export function flattenSlug(slug) {
	if (slug === "home" || slug === "homepage") {
		slug = "";
	}
	return slug;
}

export function groupBy(xs, f) {
	return xs.reduce(
		(r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
		{}
	);
}

export function hidePostcode(postcode) {
	if (!postcode) return;
	postcode = postcode.substring(0, 4);
	postcode += "***";
	return postcode;
}

export function httpTohttps(html) {
	return html.replace("http://", "https://");
}

export function removeDimensions(html) {
	html = html.replace(/width="[^"]*"/g, "");
	html = html.replace(/height="[^"]*"/g, "");
	return html;
}

export function removeOrphans(html) {
	return html.replace(/ ([^ ]*)$/, " $1");
}

export function removeSSL(html) {
	//TODO
}

export function slugTitle(html) {
	html = html.replace("-", " ");
	html = html.toLowerCase().split(" ");
	for (var i = 0; i < html.length; i++) {
		// You do not need to check if i is larger than splitStr length, as your for does that for you
		// Assign it back to the array
		html[i] = html[i].charAt(0).toUpperCase() + html[i].substring(1);
	}
	// Directly return the joined string
	return html.join(" ");
}

export function stagingToLiveURL(html) {
	html = html.replace(`href="https://fmd.noface.app/`, `href="/`);
	return html;
}

export function formatMoney(amount) {
	const options = {
		style: "currency",
		currency: "GBP",
		minimumFractionDigits: 2
	};
	// if its a whole, dollar amount, leave off the .00
	if (amount % 100 === 0) options.minimumFractionDigits = 0;
	const formatter = new Intl.NumberFormat("en-UK", options);
	return formatter.format(amount / 100);
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1); // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

export function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

export function kmToMiles(value) {
	var value = value / 1.609;
	value = value.toFixed(0);
	return value;
}

/* The Vanilla JS Toolkit */

/*!
 * More accurately check the type of a JavaScript object
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj The object
 * @return {String}     The object type
 */
export function trueTypeOf(obj) {
	return Object.prototype.toString
		.call(obj)
		.slice(8, -1)
		.toLowerCase();
}
