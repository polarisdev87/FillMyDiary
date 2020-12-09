import React, { Component } from "react";
import fetch from "isomorphic-unfetch";

import { APIURL } from "../config";

import CreateMarkup from "../components/atomic/particles/CreateMarkup";

export default class Blog extends Component {
	static async getInitialProps({ query }) {
		let content = {};
		try {
			const res = await fetch(`${APIURL}posts/v2/all?slug=${query.slug}`);
			const data = await res.json();
			content = data[0]["content"];
			return { content };
		} catch (error) {
			console.log(error);
			return { content };
		}
	}

	render() {
		return (
			<React.Fragment>
				{this.props.content && <CreateMarkup pageHTML={this.props.content} />}
			</React.Fragment>
		);
	}
}
