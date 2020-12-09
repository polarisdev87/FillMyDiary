import "isomorphic-fetch";
import { APIURL } from "./config";

async function getWordPressData(slug) {
	let content = {};
	try {
		const res = await fetch(`${APIURL}${slug}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		return { content };
	}
}

async function getWordPressDataPage(slug) {
	let content = {};
	try {
		const res = await fetch(`${APIURL}pages/v2/all?slug=${slug}`);
		const data = await res.json();
		content = data[0];
		return { content };
	} catch (error) {
		console.log(error);
		return { content };
	}
}

async function getWordPressDataMenu(slug) {
	let content = {};
	try {
		const res = await fetch(`${APIURL}menus/v2/all?slug=${slug}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		return { content };
	}
}

export { getWordPressData, getWordPressDataPage, getWordPressDataMenu };
