import React, { Component } from "react";
import { Row, Col } from "react-grid-system";
import moment from "moment";
import "moment/locale/en-gb";

import { getDistanceFromLatLonInKm, kmToMiles } from "../helpers";

import { SEARCH_JOBS_BROWSE_QUERY } from "../queries/job/SearchJobsBrowse";

import Job from "../jobs/Job";

import JobResults from "./parts/JobResults";
import SearchForm from "./parts/SearchForm";
import SearchInstructions from "./parts/SearchInstructions";
import SearchStyles from "./styles/SearchStyles";

export default class SearchBrowse extends Component {
	state = {
		/* Boolean States */
		filterByDistance: false,
		focused: false,
		loadedAllJobs: false,
		loading: false,
		setInitialTrade: false,

		/* String States */
		location: "",
		search: "",

		/* Integer States */
		distance: 0,
		price: 40,

		/* Array States */
		jobs: [],
		trade: [],

		/* Object States */
		date: moment().startOf("day"),
		dateFilter: moment().add(100, "years"),
		user: {
			latitude: 0,
			longitude: 0
		}
	};

	filterDistance = (job, user) => {
		if (
			job.latitude !== 0 &&
			job.longitude !== 0 &&
			user.latitude !== 0 &&
			user.longitude !== 0
		) {
			var distance;
			const distanceBetween = getDistanceFromLatLonInKm(
				job.latitude,
				job.longitude,
				user.latitude,
				user.longitude
			);
			distance = kmToMiles(distanceBetween);
			distance = parseFloat(distance);
			return distance;
		}
	};

	filterJobsDistance = queriedJobs => {
		if (
			this.state.distance !== 0 &&
			this.state.user.latitude !== 0 &&
			this.state.user.longitude !== 0
		) {
			const jobs = queriedJobs.filter((job, index) => {
				return this.filterDistance(job, this.state.user) < this.state.distance;
			});

			return jobs;
		} else {
			return queriedJobs;
		}
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		const val = type === "number" ? parseFloat(value) : value;

		if (name !== "distance" && name !== "trade") {
			this.setState({ [name]: val });
		}

		if (name === "distance") {
			this.setState({ distance: parseFloat(value) });
		}

		if (name === "dateFilter") {
			const dateFilter =
				parseFloat(value) === 0
					? moment().add(100, "years")
					: moment(this.state.date).add(parseFloat(value), "days");

			this.setState({
				dateFilter
			});
		}

		if (name === "trade") {
			if (val.indexOf(",") > -1) {
				this.setState({ trade: val.split(",") });
			} else {
				this.setState({ trade: [val] });
			}
		}
	};

	handleDateChange = date => {
		this.setState({ date });
	};

	handleDateFocus = focus => {
		this.setState({ focused: focus.focused });
	};

	handleInputChange = e => {
		this.setState({ search: e.target.value, location: e.target.value });
	};

	handleSelectSuggest = suggest => {
		this.setState({ search: "", location: suggest.formatted_address });

		const geocoder = new google.maps.Geocoder();

		geocoder.geocode(
			{ address: suggest.formatted_address },
			(results, status) => {
				if (status == google.maps.GeocoderStatus.OK) {
					const latitude = results[0].geometry.location.lat().toString();
					const longitude = results[0].geometry.location.lng().toString();

					let user = Object.assign({}, this.state.user);
					user.latitude = latitude;
					user.longitude = longitude;
					this.setState({ user });
				}
			}
		);
	};

	loadAllJobs = jobs => {
		this.setState({
			jobs: jobs,
			loadedAllJobs: true
		});
	};

	onSearch = async (
		e,
		date,
		dateFilter,
		distance,
		price,
		trade,
		user,
		client
	) => {
		e.preventDefault();

		// Turn loading on
		this.setState({ loading: true });

		const variables = {
			date,
			dateFilter,
			price,
			trade,
			user: user.id
		};

		// Manually query apollo client
		const res = await client.query({
			query: SEARCH_JOBS_BROWSE_QUERY,
			variables
		});

		if (distance !== 0) {
			this.setState({
				jobs: this.filterJobsDistance(res.data.jobs),
				loading: false
			});
		} else {
			this.setState({
				jobs: res.data.jobs,
				loading: false
			});
		}
	};

	setTrades = tradeID => {
		this.setState({
			trade: tradeID,
			setInitialTrade: true
		});
	};

	render() {
		return (
			<SearchStyles>
				<Row>
					<Col>
						<section className="search__count">
							<h1 className="h3">
								{this.state.jobs && `${this.state.jobs.length} Results Found`}
							</h1>
						</section>
					</Col>
				</Row>
				<Row>
					<Col lg={3}>
						<SearchForm
							date={this.state.date}
							dateFilter={this.state.dateFilter}
							distance={this.state.distance}
							focused={this.state.focused}
							location={this.state.location}
							me={this.props.me}
							price={this.state.price}
							setInitialTrade={this.state.setInitialTrade}
							trade={this.state.trade}
							search={this.state.search}
							user={this.state.user}
							handleChange={this.handleChange}
							handleDateChange={this.handleDateChange}
							handleDateFocus={this.handleDateFocus}
							handleInputChange={this.handleInputChange}
							handleSelectSuggest={this.handleSelectSuggest}
							onSearch={this.onSearch}
							setTrades={this.setTrades}
						/>
					</Col>
					<Col lg={6}>
						<JobResults
							date={this.state.date}
							jobs={this.state.jobs}
							loading={this.state.loading}
							loadedAllJobs={this.state.loadedAllJobs}
							price={this.state.price}
							setInitialTrade={this.state.setInitialTrade}
							trade={this.state.trade}
							loadAllJobs={this.loadAllJobs}
						/>
					</Col>
					{this.props.content && (
						<Col lg={3}>
							<SearchInstructions content={this.props.content} />
						</Col>
					)}
				</Row>
			</SearchStyles>
		);
	}
}
