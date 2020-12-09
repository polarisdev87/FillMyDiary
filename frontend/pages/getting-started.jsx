import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import CreateMarkup from "../components/atomic/particles/CreateMarkup";

export default class GettingStarted extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`getting-started`);
		return data;
	}

	render() {
		return <CreateMarkup pageHTML={this.props.content.content} />;
	}
}
