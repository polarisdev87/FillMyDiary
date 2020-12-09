import React, { Component } from "react";
import { Row, Col } from "react-grid-system";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/en-gb";

import { UPDATE_JOB_MUTATION } from "../../mutations/job/UpdateJob";

import { SINGLE_JOB_QUERY } from "../../queries/job/JobSingle";

import HR from "../../atomic/atoms/HR";

import ErrorMessage from "../../atomic/molecules/ErrorMessage";
import LoaderCircle from "../../atomic/molecules/loader/LoaderCircle";

import DeleteJob from "../actions/DeleteJob";

import Dates from "../parts/Dates";
import Details from "../parts/Details";
import Information from "../parts/Information";

const UpdateJobStyles = styled.section`
	h2 {
		margin-top: 0;
	}
`;

export default class UpdateJob extends Component {
	state = {
		/* Boolean States */
		addressSet: false,
		focusedInput: null,
		invalidDates: false,
		suggestionSelected: false,
		tradeSet: false,
		updated: false,
		validPostcode: false,

		/* String States */
		address: "",
		search: "",
		value: "",

		/* Integer States */

		/* Array States */
		trades: [],

		/* Object States */
		errorNoJob: {
			message: "No job found."
		},
		errorNotYourJob: {
			message: "This isn't your job to edit 👀"
		},
		successMessage: {
			message: "You've updated your job details"
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

	updateJob = async (e, updateJobMutation) => {
		e.preventDefault();

		this.setState({ updated: false });
		const res = await updateJobMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		this.setState({ updated: true });

		// Change to job page
		Router.push({
			pathname: "/job",
			query: { id: this.props.id }
		});
	};

	render() {
		return (
			<UpdateJobStyles>
				<Query
					fetchPolicy="network-only"
					query={SINGLE_JOB_QUERY}
					variables={{
						id: this.props.id
					}}
				>
					{({ data, loading }) => {
						if (loading) return <LoaderCircle />;

						if (!data.job)
							return <ErrorMessage error={this.state.errorNoJob} />;

						if (
							this.props.user.id !== data.job.user.id &&
							!this.props.user.permissions.includes("ADMIN")
						)
							return <ErrorMessage error={this.state.errorNotYourJob} />;

						const currentJob = data.job;

						// Set Address values
						if (!this.state.addressSet) {
							console.log(currentJob);

							const address = currentJob.address,
								city = currentJob.city,
								postcode = currentJob.postcode,
								town = currentJob.town;
							this.setState({
								address,
								city,
								postcode,
								town,
								value: address
							});
							this.setState({
								addressSet: true
							});
						}

						// Map Trades to an array which can be used to set state
						if (!this.state.tradeSet && currentJob.trades) {
							var jobTrades = [];
							currentJob.trades.map(trade => jobTrades.push(trade.id));
							this.setState({
								trades: jobTrades
							});
							this.setState({ tradeSet: true });
						}

						return (
							<Mutation mutation={UPDATE_JOB_MUTATION} variables={this.state}>
								{(updateJob, { loading, error }) => (
									<form onSubmit={e => this.updateJob(e, updateJob)}>
										{currentJob.stage === `CREATED` && (
											<DeleteJob id={this.props.id} user={currentJob.user.id}>
												<button className="button button--secondary">
													Delete your job
												</button>
											</DeleteJob>
										)}
										<fieldset disabled={loading} aria-busy={loading}>
											<HR />
											<Information
												content={this.props.content}
												error={error}
												title={
													this.state.title ? this.state.title : currentJob.title
												}
												trades={this.state.trades}
												getLabel={this.getLabel}
												handleChange={this.handleChange}
												handleTradeChange={this.handleTradeChange}
											/>
											<HR />
											<Details
												additional={
													this.state.additional
														? this.state.additional
														: currentJob.additional
												}
												address={this.state.address}
												certifications={
													this.state.certifications
														? this.state.certifications
														: currentJob.certifications
												}
												city={
													this.state.city ? this.state.city : currentJob.city
												}
												content={this.props.content}
												description={
													this.state.description
														? this.state.description
														: currentJob.description
												}
												location={this.state.location}
												postcode={this.state.postcode}
												search={this.state.search}
												suggestionSelected={this.state.suggestionSelected}
												validAddress={this.state.validAddress}
												value={this.state.value}
												getLabel={this.getLabel}
												handleChange={this.handleChange}
												handleInputChange={this.handleInputChange}
												handleSelectSuggest={this.handleSelectSuggest}
											/>
											<HR />
											<Dates
												content={this.props.content}
												days={
													this.state.days ? this.state.days : currentJob.days
												}
												endDate={
													this.state.endDate
														? this.state.endDate
														: moment(currentJob.endDate)
												}
												focusedInput={this.state.focusedInput}
												paymentType={
													this.state.paymentType
														? this.state.paymentType
														: currentJob.paymentType
												}
												price={
													this.state.price ? this.state.price : currentJob.price
												}
												startDate={
													this.state.startDate
														? this.state.startDate
														: moment(currentJob.startDate)
												}
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
						);
					}}
				</Query>
			</UpdateJobStyles>
		);
	}
}
