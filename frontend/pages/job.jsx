import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import RestrictAreaUser from "../components/atomic/particles/RestrictAreaUser";

import Wrapper from "../components/atomic/molecules/Wrapper";

import SingleJob from "../components/jobs/single/SingleJob";

export default class Job extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`job`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<SingleJob id={this.props.query.id} me={this.props.me} />
			</Wrapper>
		);
	}
}
