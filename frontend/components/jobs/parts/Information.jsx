import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Row, Col } from "react-grid-system";

import FancyCheckboxes from "../../styles/FancyCheckboxes";

import ErrorMessage from "../../atomic/molecules/ErrorMessage";
import LoaderCircle from "../../atomic/molecules/loader/LoaderCircle";
import SuccessMessage from "../../atomic/molecules/SuccessMessage";

import { ALL_TRADES_QUERY } from "../../queries/trade/AllTrades";

export default class Information extends Component {
	render() {
		return (
			<Row>
				<Col lg={6}>
					<h2>
						{this.props.content && this.props.content["heading_two"].value}
					</h2>
					{this.props.error && <ErrorMessage error={this.props.error} />}

					{this.props.content && (
						<p
							dangerouslySetInnerHTML={{
								__html: this.props.content["paragraph_two"].value
							}}
						/>
					)}
				</Col>
				<Col lg={5} offset={{ lg: 1 }}>
					<label htmlFor="title">{this.props.getLabel(1, `Title`)}</label>
					<input
						type="text"
						id="title"
						name="title"
						required
						value={this.props.title}
						onChange={this.props.handleChange}
					/>
					<Query query={ALL_TRADES_QUERY}>
						{({ data, loading, error }) => {
							if (loading) return <LoaderCircle />;
							if (error) return <ErrorMessage error={error} />;
							if (!data || !data.trades) return null;
							return (
								<>
									<label>{this.props.getLabel(2, `Trade Required`)}</label>
									<FancyCheckboxes>
										<div className="container">
											{data &&
												data.trades.map(trade => (
													<React.Fragment key={trade.id}>
														<input
															checked={this.props.trades.includes(trade.id)}
															id={trade.id}
															onChange={this.props.handleTradeChange}
															type="checkbox"
															value={trade.id}
														/>
														<label htmlFor={trade.id}>{trade.name}</label>
													</React.Fragment>
												))}
										</div>
									</FancyCheckboxes>
								</>
							);
						}}
					</Query>
				</Col>
			</Row>
		);
	}
}
