import React, { Component } from "react";
import styled from "styled-components";

import { device } from "../../../lib/MediaQueries";

const HRElement = styled.hr`
	margin: 32px auto;

	border: 1px solid #d9d9d9;

	@media ${device.xl} {
		margin: 80px auto;
	}

	&.hr--invisible {
		border-color: transparent;
		color: transparent;
		opacity: 0;
	}

	&.hr--sm {
		margin: 8px auto;
	}

	&.hr--md {
		margin: 16px auto;
	}

	&.hr--lg {
		margin: 24px auto;

		@media ${device.md} {
			margin: 32px auto;
		}
	}

	&.hr--xl {
		margin: 48px auto;

		@media ${device.md} {
			margin: 64px auto;
		}
	}
`;

export default class HR extends Component {
	render() {
		var classList = "";
		if (this.props.size) classList = classList + `hr--${this.props.size} `;
		if (this.props.invisible) classList = classList + `hr--invisible `;
		return <HRElement className={classList} />;
	}
}
