import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import { Row, Col } from "react-grid-system";

import { CREATE_USER_MUTATION } from "../../mutations/user/CreateUser";

import { CURRENT_USER_QUERY } from "../../queries/user/CurrentUser";

import FancyCheckboxes from "../../styles/FancyCheckboxes";

import HR from "../../atomic/atoms/HR";
import Link from "../../atomic/atoms/Link";

import ManualSubmit from "../parts/parts/ManualSubmit";
import TermsAgreement from "../parts/parts/TermsAgreement";

import Basics from "../parts/basics/Basics";
import Information from "../parts/information/Information";
import Qualifications from "../parts/qualifications/Qualifications";
import Authentication from "../parts/authentication/Authentication";

export default class CreateUser extends Component {
	state = {
		/* Boolean States */
		acceptedTerms: false,
		focusedInput: null,
		manualReferences: false,
		suggestionSelected: false,

		/* String States */
		address: "",
		businessName: "",
		certifications: "",
		coupon: "",
		city: "",
		email: "",
		manualReferenceOne: "",
		manualReferenceThree: "",
		manualReferenceTwo: "",
		name: "",
		password: "",
		postcode: "",
		referenceOne: "",
		search: "",
		telephone: "",
		town: "",
		value: "",
		website: "",

		/* Integer States */
		jobNotifications: 100,

		/* Array States */
		certificationsArray: [],
		trades: []

		/* Object States */
	};

	// state = {
	// 	/* Boolean States */
	// 	acceptedTerms: false,
	// 	focusedInput: null,
	// 	manualReferences: false,
	// 	suggestionSelected: false,

	// 	/* String States */
	// 	address: "",
	// 	businessName: "NoFace",
	// 	certifications: "",
	// 	coupon: "",
	// 	city: "Southampton",
	// 	email: "jack++@noface.co.uk",
	// 	manualReferenceOne: "",
	// 	manualReferenceThree: "",
	// 	manualReferenceTwo: "",
	// 	name: "Jack Lloyd Pritchard",
	// 	password: "asdasdsa52861888",
	// 	postcode: "SO14 0FG",
	// 	referenceOne: "noface.co.uk",
	// 	search: "",
	// 	telephone: "+447776812750",
	// 	town: "Southampton",
	// 	value: "",
	// 	website: "",

	// 	/* Integer States */

	// 	/* Array States */
	// 	certificationsArray: [],
	// 	trades: []

	// 	/* Object States */
	// };

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
		this.setState({ certifications: tags.join(", ") });
	};

	handleTradeChange = e => {
		const checkbox = e.target;
		let updatedTrades = [...this.state.trades];
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

		this.setState({ address, city, postcode, town, suggestionSelected: true });

		const geocoder = new google.maps.Geocoder();

		geocoder.geocode({ address: address }, (results, status) => {
			if (status == google.maps.GeocoderStatus.OK) {
				const latitude = results[0].geometry.location.lat().toString();
				const longitude = results[0].geometry.location.lng().toString();
				this.setState({ latitude, longitude });
			}
		});
	};

	createTheUser = async (e, createUser) => {
		e.preventDefault();
		this.returnUser(createUser);
	};

	createTheUserManual = async (res, createUser) => {
		if (res.id) {
			this.setState({ token: res.id }, () => this.returnUser(createUser));
		}
	};

	returnUser = async createUser => {
		const response = await createUser();

		this.setState({
			name: "",
			email: "",
			password: "",
			res: ""
		});

		Router.push({
			pathname: "/confirmation"
		});
	};

	render() {
		return (
			<Mutation
				mutation={CREATE_USER_MUTATION}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}
				variables={this.state}
			>
				{(createUser, { error, loading }) => {
					return (
						<form
							method="post"
							onSubmit={e => this.createTheUser(e, createUser)}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<HR invisible={true} />
								<Basics
									error={error}
									loading={loading}
									content={this.props.content}
									getLabel={this.getLabel}
									handleChange={this.handleChange}
									handleTradeChange={this.handleTradeChange}
									coupon={this.state.coupon}
									jobNotifications={this.state.jobNotifications}
									trades={this.state.trades}
									email={this.state.email}
									password={this.state.password}
								/>
								<HR />
								<Information
									address={this.state.address}
									content={this.props.content}
									businessName={this.state.businessName}
									city={this.state.city}
									postcode={this.state.postcode}
									name={this.state.name}
									search={this.state.search}
									suggestionSelected={this.state.suggestionSelected}
									telephone={this.state.telephone}
									town={this.state.town}
									value={this.state.value}
									website={this.state.website}
									getLabel={this.getLabel}
									handleChange={this.handleChange}
									handleInputChange={this.handleInputChange}
									handleSelectSuggest={this.handleSelectSuggest}
								/>
								<HR />
								<Qualifications
									certifications={this.state.certificationsArray}
									content={this.props.content}
									getLabel={this.getLabel}
									handleCertificationsChange={this.handleCertificationsChange}
								/>
								<HR />
								<Authentication
									acceptedTerms={this.state.acceptedTerms}
									content={this.props.content}
									getLabel={this.getLabel}
									handleChange={this.handleChange}
									manualReferences={this.state.manualReferences}
									referenceOne={this.state.referenceOne}
									manualReferenceOne={this.state.manualReferenceOne}
									manualReferenceTwo={this.state.manualReferenceTwo}
									manualReferenceThree={this.state.manualReferenceThree}
								/>
							</fieldset>
							<Row>
								<Col
									lg={5}
									offset={{
										lg: 7
									}}
								>
									{this.state.manualReferences ? (
										<ManualSubmit
											acceptedTerms={this.state.acceptedTerms}
											createUser={createUser}
											createTheUserManual={this.createTheUserManual}
											manualReferenceOne={this.state.manualReferenceOne}
											manualReferenceTwo={this.state.manualReferenceTwo}
											manualReferenceThree={this.state.manualReferenceThree}
											address={this.state.address}
											businessName={this.state.businessName}
											email={this.state.email}
											password={this.state.password}
											trades={this.state.trades}
											town={this.state.town}
											city={this.state.city}
											telephone={this.state.telephone}
											postcode={this.state.postcode}
											getLabel={this.getLabel}
										/>
									) : (
										<>
											<TermsAgreement
												acceptedTerms={this.state.acceptedTerms}
												handleChange={this.handleChange}
											/>
											<button
												disabled={!this.state.acceptedTerms}
												type="submit"
												value="Create Account"
											>
												Create Account
											</button>
										</>
									)}
								</Col>
							</Row>
						</form>
					);
				}}
			</Mutation>
		);
	}
}
