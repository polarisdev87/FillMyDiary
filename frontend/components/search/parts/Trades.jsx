import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ALL_TRADES_QUERY = gql`
	query ALL_TRADES_QUERY {
		trades(orderBy: name_ASC) {
			id
			name
			slug
		}
	}
`;

export default class Trades extends Component {
	render() {
		const { setInitialTrade } = this.props;

		return (
			<Query query={ALL_TRADES_QUERY}>
				{({ data, loading, error }) => {
					if (!data || !data.trades) return null;
					const allTrades = data.trades.map(trade => trade.id);
					if (!setInitialTrade) this.props.setTrades(allTrades);
					return (
						<>
							<label htmlFor="trade">Trade</label>
							<select
								id="trade"
								name="trade"
								onChange={this.props.handleChange}
							>
								<option id="trade__all" value={allTrades}>
									All Trades
								</option>
								{data &&
									data.trades.map((trade, index) => (
										<option key={trade.id} value={[trade.id]}>
											{trade.name}
										</option>
									))}
							</select>
						</>
					);
				}}
			</Query>
		);
	}
}
