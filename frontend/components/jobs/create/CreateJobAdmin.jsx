import React, { Component } from "react";
import { Row, Col } from "react-grid-system";
import Router from "next/router";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import Downshift from "downshift";
import debounce from "lodash.debounce";
import moment from "moment";
import "moment/locale/en-gb";

import { CREATE_JOB_ADMIN_MUTATION } from "../../mutations/admin/CreateJobAdmin";

import { SEARCH_USERS_QUERY } from "../../queries/user/SearchUsers";

import HR from "../../atomic/atoms/HR";

import Dates from "../parts/Dates";
import Details from "../parts/Details";
import Information from "../parts/Information";
import UserSearch from "../parts/UserSearch";

const CreateJobAdminContainer = styled.section`
	input[type="search"] {
		border-radius: 8px;
		padding: 16px;
		width: 100%;

		background-color: white;
		border: 1px solid #d9d9d9;
	}
`;

const paymentTypeBoolean = Math.round(Math.random());

export default class CreateJobAdmin extends Component {
	state = {
		/* Boolean States */
		focusedInput: null,
		loading: false,
		suggestionSelected: false,
		validPostcode: false,

		/* String States */
		additional: "",
		address: "",
		certifications: "",
		description: "",
		location: "",
		paymentType: "cash",
		postcode: "",
		search: "",
		title: "",
		value: "",

		/* Integer States */
		days: 1,
		latitude: 0,
		longitude: 0,
		price: 40,

		/* Array States */
		trades: [],
		users: [],

		/* Object States */
		endDate: moment(), // set your initial end date here
		startDate: moment(), // set your initial start date here
		user: {}
	};

	getLabel = (index, fallback) => {
		if (!this.props.content.form_labels) {
			return fallback;
		}

		const pos = parseFloat(index) - 1;
		return this.props.content.form_labels.value[pos].label
			? this.props.content.form_labels.value[pos].label
			: fallback;
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		var val = type === "number" ? parseFloat(value) : value;

		this.setState({ [name]: val });
	};

	handleDateChange = (startDate, endDate) => {
		this.setState({ startDate, endDate });
	};

	handleDateFocus = focusedInput => {
		this.setState({ focusedInput });
	};

	handleTradeChange = e => {
		const checkbox = e.target;
		var updatedTrades = this.state.trades;

		if (checkbox.checked) {
			updatedTrades.push(checkbox.value);
			if (updatedTrades.length > 1) {
				updatedTrades.shift();
			}
		}

		this.setState({ trades: updatedTrades });
	};

	onChange = debounce(async (e, client) => {
		// Turn loading on
		this.setState({ loading: true });
		// Manually query apollo client
		const res = await client.query({
			query: SEARCH_USERS_QUERY,
			variables: {
				needle: e.target.value
			}
		});
		this.setState({ users: res.data.users, loading: false });
	}, 350);

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

		this.setState({ address, city, postcode, town });

		const geocoder = new google.maps.Geocoder();

		geocoder.geocode({ address: address }, (results, status) => {
			if (status == google.maps.GeocoderStatus.OK) {
				const latitude = results[0].geometry.location.lat().toString();
				const longitude = results[0].geometry.location.lng().toString();
				this.setState({ latitude, longitude });
			}
		});
	};

	render() {
		return (
			<CreateJobAdminContainer>
				<Mutation
					mutation={CREATE_JOB_ADMIN_MUTATION}
					variables={this.state}
					update={this.update}
				>
					{(createJobAdmin, { loading, error }) => (
						<form
							onSubmit={async e => {
								// Stop form from submiting
								e.preventDefault();
								// Call the mutation
								const res = await createJobAdmin();
								// Change to job page
								Router.push({
									pathname: "/job",
									query: { id: res.data.createJobAdmin.id }
								});
							}}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<UserSearch
									getLabel={this.getLabel}
									handleChange={this.handleChange}
									onChange={this.onChange}
									user={this.state.user}
									users={this.state.users}
								/>
								<HR />
								<Information
									content={this.props.content}
									error={error}
									title={this.state.title}
									trades={this.state.trades}
									getLabel={this.getLabel}
									handleChange={this.handleChange}
									handleTradeChange={this.handleTradeChange}
								/>
								<HR />
								<Details
									content={this.props.content}
									description={this.state.description}
									certifications={this.state.certifications}
									additional={this.state.additional}
									getLabel={this.getLabel}
									handleChange={this.handleChange}
									handleInputChange={this.handleInputChange}
									handleSelectSuggest={this.handleSelectSuggest}
									location={this.state.location}
									postcode={this.state.postcode}
									search={this.state.search}
									value={this.state.value}
								/>
								<HR />
								<Dates
									content={this.props.content}
									days={this.state.days}
									endDate={this.state.endDate}
									focusedInput={this.state.focusedInput}
									paymentType={this.state.paymentType}
									price={this.state.price}
									startDate={this.state.startDate}
									getLabel={this.getLabel}
									handleChange={this.handleChange}
									handleDateChange={this.handleDateChange}
									handleDateFocus={this.handleDateFocus}
								/>
							</fieldset>
							<Row>
								<Col lg={5} offset={{ lg: 7 }}>
									<button type="submit" value="Submit">
										Submit
									</button>
								</Col>
							</Row>
						</form>
					)}
				</Mutation>
			</CreateJobAdminContainer>
		);
	}
}
