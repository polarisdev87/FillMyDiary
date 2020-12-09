import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import Wrapper from "../components/atomic/molecules/Wrapper";

import Search from "../components/search/Search";

export default class SearchPage extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`search`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<Search content={this.props.content.content} me={this.props.me} />
			</Wrapper>
		);
	}
}
