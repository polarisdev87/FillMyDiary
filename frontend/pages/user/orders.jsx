import React, { Component } from "react";
import { getWordPressDataPage } from "../../commonFunctions";

import Wrapper from "../../components/atomic/molecules/Wrapper";

import RestrictAreaCurrent from "../../components/atomic/particles/RestrictAreaCurrent";

import UserOrders from "../../components/users/UserOrders";

export default class UserOrdersPage extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`orders`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<RestrictAreaCurrent id={this.props.query.id}>
					<UserOrders
						id={this.props.query.id}
						content={this.props.content.content}
					/>
				</RestrictAreaCurrent>
			</Wrapper>
		);
	}
}
