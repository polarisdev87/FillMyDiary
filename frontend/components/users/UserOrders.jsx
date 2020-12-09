import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { Query } from "react-apollo";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";

import { formatMoney } from "../helpers";

import { USER_ORDERS_QUERY } from "../queries/order/UserOrders";

import Link from "../atomic/atoms/Link";

import Breadcrumbs from "../atomic/molecules/Breadcrumbs";
import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

const UserOrdersElement = styled.div`
	margin-top: 64px;
	padding: 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

	.button {
		margin: 16px 0 16px auto;
	}
`;

export default class UpdateUser extends Component {
	createMarkup(content) {
		return { __html: content };
	}

	render() {
		return (
			<Query
				fetchPolicy="network-only"
				query={USER_ORDERS_QUERY}
				variables={{
					id: this.props.id
				}}
			>
				{({ data, loading }) => {
					if (loading) return <LoaderCircle />;
					if (!data) return <p>No data..</p>;

					const navigationItems = [
						{
							title: "User Account",
							url: `/user?id=${this.props.id}`
						},
						{
							title: "Orders",
							url: `/user/orders?id=${this.props.id}`
						}
					];

					return (
						<Row>
							<Col xl={3}>
								<UserOrdersElement>
									<h1 className="h2">
										{this.props.content &&
											this.props.content["heading_one"].value}
									</h1>
									{this.props.content && (
										<p
											dangerouslySetInnerHTML={this.createMarkup(
												this.props.content["paragraph_one"].value
											)}
										/>
									)}
								</UserOrdersElement>
							</Col>
							<Col xl={9}>
								<UserOrdersElement>
									<Breadcrumbs menuObject={navigationItems} />
									<PrintMe orders={data.orders} />
								</UserOrdersElement>
							</Col>
						</Row>
					);
				}}
			</Query>
		);
	}
}

class OrdersTable extends Component {
	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Reference ID</th>
						<th>Title</th>
						<th>Days on Job</th>
						<th>Price per day</th>
						<th>Finders Fee (10%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.orders
						? this.props.orders.map(order => {
								return <SingleOrder order={order} />;
						  })
						: null}
				</tbody>
			</table>
		);
	}
}

class SingleOrder extends Component {
	render() {
		const { order } = this.props;

		return (
			<tr className="order">
				<td>{order.id}</td>
				<td>{order.job.title}</td>
				<td>{order.job.days}</td>
				<td>{formatMoney(order.job.price * 100)}</td>
				<td>{formatMoney(order.total)}</td>
			</tr>
		);
	}
}

class PrintMe extends Component {
	render() {
		return (
			<>
				<ReactToPrint
					trigger={() => (
						<a href="#" className="button button--primary">
							Print Order Records
						</a>
					)}
					content={() => this.componentRef}
				/>
				<OrdersTable
					orders={this.props.orders}
					ref={el => (this.componentRef = el)}
				/>
			</>
		);
	}
}
