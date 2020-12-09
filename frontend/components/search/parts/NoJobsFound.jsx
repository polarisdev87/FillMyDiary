import React, { Component } from "react";
import styled from "styled-components";

import IllustrationConstruction from "../../../assets/illustrations/construction-site.svg";

const NoJobsFoundElement = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 24px;

	text-align: center;

	h1 {
		margin-top: 0;
	}

	img,
	svg {
		margin-top: 16px;
		max-width: 100%;
		width: 400px;
	}
`;

export default class NoJobsFound extends Component {
	render() {
		return (
			<NoJobsFoundElement>
				<h1>We couldn't find any jobs</h1>
				<p>
					Sorry about that, try searching with other filters and we'll try our
					best to find jobs that match your search!
				</p>
				<IllustrationConstruction />
			</NoJobsFoundElement>
		);
	}
}
