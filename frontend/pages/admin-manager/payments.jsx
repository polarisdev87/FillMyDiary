import React, { Component } from "react";
import { Query } from "react-apollo";

import { ALL_ORDERS_QUERY } from "../../components/queries/order/AllOrders";

import AmountChartElement from "../../components/admin/charts/amount";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import HR from "../../components/atomic/atoms/HR";
import Link from "../../components/atomic/atoms/Link";

import HeaderAdmin from "../../components/header/Admin";

export default class Payments extends Component {
	render() {
		return (
			<RestrictAreaAdmin>
				<section>
					<HeaderAdmin />
					<h1>Payments</h1>
					<a
						className="button"
						href="https://dashboard.stripe.com"
						target="_blank"
					>
						View Payments on Stripe
					</a>
					<HR />
					<Query query={ALL_ORDERS_QUERY}>
						{({ data, loading, error }) => {
							if (loading) return null;
							if (error) return <ErrorMessage error={error} />;
							return (
								<AmountChartElement
									id="chartUsers"
									data={data.orders}
									title="Orders"
									yLabel="Total of Orders"
								/>
							);
						}}
					</Query>
				</section>
			</RestrictAreaAdmin>
		);
	}
}
