import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import CreateMarkup from "../components/atomic/particles/CreateMarkup";

export default class ApplicationConfirmation extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`application-confirmation`);
		return data;
	}

	render() {
		return <CreateMarkup pageHTML={this.props.content.content} />;
	}
}
