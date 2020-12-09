import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/en-gb";

import IconChevronDown from "../../assets/icons/fa/chevron-down.svg";

import SingleJobElement from "./styles/JobSingleStyles";

import Link from "../atomic/atoms/Link";

export default class Job extends Component {
	static propTypes = {
		job: PropTypes.object.isRequired
	};

	hidePostcode(postcode) {
		if (!postcode) return;
		postcode = postcode.substring(0, postcode.length - 3);
		postcode += "***";
		return postcode;
	}

	render() {
		const { index, job } = this.props;

		const {
			id,
			description,
			days,
			endDate,
			postcode,
			price,
			startDate,
			title,
			trades
		} = job;

		return (
			<SingleJobElement className="job">
				<div className="job__details">
					<header className="job__header">
						<div>
							<Link href={{ pathname: "/job", query: { id: id } }}>
								<a>
									<h2 className="job__title">{title}</h2>
									<h2 className="job__title">£{price} Per Day</h2>
								</a>
							</Link>
							<ul>
								<li>
									{trades.map(trade => (
										<span key={trade.id} className="job__trade">
											{trade.name}
										</span>
									))}
								</li>
								<li>{this.hidePostcode(postcode)}</li>
								<li>
									Start on{` `}
									{moment(startDate).format("Do MMMM YYYY")}
								</li>
								<li>{days && `${days} Days of Work`}</li>
							</ul>
						</div>
					</header>
					<div className="job__description">
						<p className="text--wrap">
							{job.description.replace(/(.{300})..+/, "$1...")}
						</p>
					</div>
					<div className="job__actions">
						<Link
							href={{ pathname: "/job", query: { id: id } }}
							classList="button"
						>
							<a>Apply for Job</a>
						</Link>
					</div>
				</div>
			</SingleJobElement>
		);
	}
}
