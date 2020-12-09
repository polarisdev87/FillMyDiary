import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/en-gb";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "../../assets/scss/datepicker.scss";

import { UPDATE_USER_MUTATION } from "../mutations/user/UpdateUser";

import { CURRENT_USER_QUERY } from "../queries/user/CurrentUser";
import { SINGLE_USER_QUERY } from "../queries/user/SingleUser";

import Basics from "./parts/basics/Basics";
import Information from "./parts/information/Information";
import Qualifications from "./parts/qualifications/Qualifications";

import HR from "../atomic/atoms/HR";

import ErrorMessage from "../atomic/molecules/ErrorMessage";
import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";
import SuccessMessage from "../atomic/molecules/SuccessMessage";

export default class UpdateUser extends Component {
	state = {
		/* Boolean States */
		addressSet: false,
		focusedInput: null,
		tradeSet: false,
		suggestionSelected: false,
		updated: false,
		validAddress: false,

		/* String States */
		address: "",
		id: this.props.id,
		search: "",
		value: "",

		/* Integer States */

		/* Array States */
		trades: [],

		/* Object States */
		successMessage: {
			message: "You've updated the users details"
		}
	};

	getLabel = (index, fallback) => {
		const pos = parseFloat(index) - 1;

		if (!this.props.content.form_labels) {
			return fallback;
		}

		return this.props.content.form_labels.value[pos].label
			? this.props.content.form_labels.value[pos].label
			: fallback;
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		var val;

		if (type === "number") {
			val = parseFloat(value);
		} else if (type === "checkbox") {
			val = e.target.checked;
		} else {
			val = value;
		}

		if (name === "jobNotifications") {
			val = parseFloat(value);
		}

		this.setState({ [name]: val });
	};

	handleCertificationsChange = tags => {
		this.setState({ certificationsArray: tags });
		this.setState({
			certifications: tags.join(", ")
		});
	};

	handleTradeChange = e => {
		const checkbox = e.target;
		var updatedTrades = [...this.state.trades];
		if (checkbox.checked) {
			updatedTrades.push(checkbox.value);
		} else {
			updatedTrades = updatedTrades.filter(trades => trades !== checkbox.value);
		}
		this.setState({ trades: updatedTrades });
	};

	handleInputChange = e => {
		this.setState({
			search: e.target.value,
			address: e.target.value,
			value: e.target.value
		});
	};

	handleSelectSuggest = suggest => {
		if (!suggest.formatted_address) {
			return;
		}

		const address = suggest.formatted_address;
		this.setState({
			search: "",
			value: address
		});

		const components = suggest.address_components.map(component => ({
			type: component.types[0],
			value: component.long_name ? component.long_name : component.short_name
		}));

		function getAddressValue(component) {
			if (components.some(e => e.type === component)) {
				return components.find(e => e.type === component).value;
			} else {
				return "";
			}
		}

		const city = getAddressValue("administrative_area_level_2");
		const postcode = getAddressValue("postal_code");
		const town = getAddressValue("postal_town");

		this.setState({
			address,
			city,
			postcode,
			town,
			suggestionSelected: true
		});

		const geocoder = new google.maps.Geocoder();

		geocoder.geocode({ address: address }, (results, status) => {
			if (status == google.maps.GeocoderStatus.OK) {
				const latitude = results[0].geometry.location.lat().toString();
				const longitude = results[0].geometry.location.lng().toString();
				this.setState({ latitude, longitude });
			}
		});
	};

	updateUser = async (e, updateUserMutation) => {
		e.preventDefault();
		this.setState({ updated: false });
		const res = await updateUserMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		this.setState({ updated: true });
	};

	setReviewDate = date => {
		this.setState({
			dateReviewSet: true,
			dateReview: date
		});
	};

	increaseReviewDate = (e, amount, length) => {
		e.preventDefault();
		this.setState({
			dateReview: moment(this.state.dateReview).add(amount, length)
		});
	};

	render() {
		return (
			<Query
				fetchPolicy="network-only"
				query={SINGLE_USER_QUERY}
				variables={{
					id: this.props.id
				}}
			>
				{({ data, loading }) => {
					if (loading) return <LoaderCircle />;
					if (!data) return <p>No data..</p>;
					const currentUser = data.user;
					// Map Trades to an array which can be used to set state
					if (!this.state.tradeSet) {
						var userTrades = [];
						currentUser.trades.map(trade => userTrades.push(trade.id));
						this.setState({
							trades: userTrades
						});
						this.setState({ tradeSet: true });
					}

					// Set Address values
					if (!this.state.addressSet) {
						const address = data.user.address,
							city = data.user.city,
							postcode = data.user.postcode,
							town = data.user.town;
						this.setState({
							address,
							city,
							postcode,
							town,
							value: address
						});
						this.setState({ addressSet: true });
					}

					var dateToReview = moment().startOf("day");
					if (currentUser.dateReview)
						dateToReview = moment(currentUser.dateReview);

					if (!this.state.dateReviewSet) this.setReviewDate(dateToReview);

					return (
						<Mutation
							mutation={UPDATE_USER_MUTATION}
							refetchQueries={[
								{ query: CURRENT_USER_QUERY },
								{ query: SINGLE_USER_QUERY }
							]}
							variables={this.state}
						>
							{(updateUser, { error, loading }) => {
								return (
									<form
										method="post"
										onSubmit={e => this.updateUser(e, updateUser)}
									>
										<fieldset disabled={loading} aria-busy={loading}>
											<HR invisible={true} />
											<Row>
												<Col lg={6}>
													<h1 className="h2">
														Date to Review User Certifications
													</h1>
													<ErrorMessage error={error} />
													<p>
														Periodically user's credentials will need to be
														reviewed.
													</p>
													<p>
														You can set up the user's review date which when
														passed will flag the user to be reviewed by an
														administrator.
													</p>
													{this.state.updated && (
														<SuccessMessage
															success={this.state.successMessage}
														/>
													)}
												</Col>
												<Col
													lg={5}
													offset={{
														lg: 1
													}}
												>
													<label htmlFor="dateReview">
														Date To Review User
													</label>
													<SingleDatePicker
														date={
															this.state.dateReview
																? this.state.dateReview
																: dateToReview
														}
														onDateChange={date =>
															this.setState({
																dateReview: date
															})
														} // PropTypes.func.isRequired
														focused={this.state.focused} // PropTypes.bool
														onFocusChange={({ focused }) =>
															this.setState({
																focused
															})
														} // PropTypes.func.isRequired
														id="dateReview" // PropTypes.string.isRequired
														noBorder={true}
														block={true}
													/>
													<button
														onClick={e =>
															this.increaseReviewDate(e, 1, `months`)
														}
													>
														Add One Month
													</button>
													<button
														onClick={e =>
															this.increaseReviewDate(e, 1, `years`)
														}
													>
														Add One Year
													</button>
													<div>
														<button type="submit" value="Update Account">
															Update Account
														</button>
													</div>
												</Col>
											</Row>
											<HR />
											<Basics
												action="update"
												admin={true}
												error={error}
												loading={loading}
												content={this.props.content}
												coupon={data.user.coupon}
												email={data.user.email}
												jobNotifications={
													this.state.jobNotifications
														? this.state.jobNotifications
														: data.user.jobNotifications
												}
												trades={data.user.trades}
												updated={this.state.updated}
												successMessage={this.state.successMessage}
												getLabel={this.getLabel}
												handleChange={this.handleChange}
												handleTradeChange={this.handleTradeChange}
											/>
											<HR />
											<Information
												action="update"
												content={this.props.content}
												address={this.state.address}
												businessName={
													data.user.businessName ? data.user.businessName : null
												}
												city={
													this.state.city ? this.state.city : data.user.city
												}
												name={data.user.name ? data.user.name : null}
												postcode={this.state.postcode}
												search={this.state.search}
												telephone={
													data.user.telephone ? data.user.telephone : null
												}
												town={
													this.state.town ? this.state.town : data.user.town
												}
												value={this.state.value}
												website={data.user.website ? data.user.website : null}
												validAddress={this.state.validAddress}
												getLabel={this.getLabel}
												handleChange={this.handleChange}
												handleInputChange={this.handleInputChange}
												handleSelectSuggest={this.handleSelectSuggest}
											/>
											<HR />
											<Qualifications
												action="update"
												certifications={this.state.certificationsArray}
												certificationsInitial={data.user.certifications.split(
													", "
												)}
												content={this.props.content}
												getLabel={this.getLabel}
												handleCertificationsChange={
													this.handleCertificationsChange
												}
											/>
										</fieldset>
										<Row>
											<Col
												lg={5}
												offset={{
													lg: 7
												}}
											>
												<button type="submit" value="Update Account">
													Update Account
												</button>
											</Col>
										</Row>
									</form>
								);
							}}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}
