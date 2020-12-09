import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";

import { UPDATE_USER_MUTATION } from "../../mutations/user/UpdateUser";

import { CURRENT_USER_QUERY } from "../../queries/user/CurrentUser";
import { SINGLE_USER_QUERY } from "../../queries/user/SingleUser";

import Basics from "../parts/basics/Basics";
import Information from "../parts/information/Information";
import Qualifications from "../parts/qualifications/Qualifications";

import HR from "../../atomic/atoms/HR";

import LoaderCircle from "../../atomic/molecules/loader/LoaderCircle";

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
		search: "",
		value: "",

		/* Integer States */

		/* Array States */
		trades: [],

		/* Object States */
		successMessage: {
			message: "You've updated your profile details"
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
		this.setState({ search: "", value: address });

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
					if (!data) return <p>No user found</p>;
					const currentUser = data.user;

					// Map Trades to an array which can be used to set state
					if (!this.state.tradeSet) {
						var userTrades = [];
						currentUser.trades.map(trade => userTrades.push(trade.id));
						this.setState({ trades: userTrades, tradeSet: true });
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
											<Basics
												action="update"
												error={error}
												loading={loading}
												content={this.props.content}
												getLabel={this.getLabel}
												handleChange={this.handleChange}
												handleTradeChange={this.handleTradeChange}
												coupon={data.user.coupon}
												trades={data.user.trades}
												email={data.user.email}
												jobNotifications={
													this.state.jobNotifications
														? this.state.jobNotifications
														: data.user.jobNotifications
												}
												updated={this.state.updated}
												successMessage={this.state.successMessage}
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
												suggestionSelected={this.state.suggestionSelected}
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
										</fieldset>
										<Row>
											<Col
												lg={5}
												offset={{
													lg: 7
												}}
											>
												<button
													disabled={this.state.postcode === ""}
													type="submit"
													value="Update Account"
												>
													{this.state.postcode === ""
														? `Please enter a valid postcode`
														: `Update Account`}
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
