import React, { Component } from "react";
import { ApolloConsumer, Query } from "react-apollo";

import Distance from "./Distance";
import Location from "./Location";
import PayPerDay from "./PayPerDay";
import StartDate from "./StartDate";
import Trades from "./Trades";

export default class SearchForm extends Component {
	render() {
		const {
			date,
			dateFilter,
			distance,
			focused,
			location,
			me,
			price,
			setInitialTrade,
			trade,
			search,
			user
		} = this.props;

		return (
			<section className="search__filters">
				<header>
					<h2>Search Filters</h2>
				</header>

				<ApolloConsumer>
					{client => (
						<form
							onSubmit={e => {
								e.persist();
								this.props.onSearch(
									e,
									date,
									dateFilter,
									distance,
									price,
									trade,
									me,
									client
								);
							}}
						>
							<Location
								handleInputChange={this.props.handleInputChange}
								handleSelectSuggest={this.props.handleSelectSuggest}
								location={location}
								search={search}
							/>
							<div className="search__input">
								<Distance handleChange={this.props.handleChange} user={user} />
							</div>
							<div className="search__input">
								<StartDate
									date={date}
									focused={focused}
									handleChange={this.props.handleChange}
									handleDateChange={this.props.handleDateChange}
									handleDateFocus={this.props.handleDateFocus}
									user={user}
								/>
							</div>
							<div className="search__input">
								<Trades
									handleChange={this.props.handleChange}
									setInitialTrade={setInitialTrade}
									setTrades={this.props.setTrades}
								/>
							</div>
							<div className="search__input">
								<PayPerDay
									handleChange={this.props.handleChange}
									price={price}
								/>
							</div>
							<div className="search__input">
								<button type="submit">Search For Jobs</button>
							</div>
						</form>
					)}
				</ApolloConsumer>
			</section>
		);
	}
}
