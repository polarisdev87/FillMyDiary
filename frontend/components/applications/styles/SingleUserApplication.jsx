import React, { Component } from "react";
import styled from "styled-components";

import { device } from "../../../lib/MediaQueries";

const SingleUserApplication = styled.section`
	padding: 16px;

	@media ${device.sm} {
		padding: 32px;
	}

	a {
		text-decoration: none;
	}

	h1 {
		margin-top: 0;
	}

	nav {
		h2,
		h3,
		h4 {
			@media ${device.sm} {
				margin-bottom: 0;
				margin-top: 8px;
			}
		}
	}

	.application__title {
		margin-bottom: 32px;
		padding: 32px 0;
		border-bottom: 1px solid
			${props => (props.theme.grey100 ? props.theme.grey100 : "lightgrey")};
		border-top: 1px solid
			${props => (props.theme.grey100 ? props.theme.grey100 : "lightgrey")};

		@media ${device.sm} {
			align-items: flex-start;
			display: flex;
			justify-content: space-between;
		}

		> * {
			margin: 0;
		}
	}

	.user__approved {
		align-items: center;
		display: flex;

		svg {
			height: 16px;
			margin-left: 4px;

			fill: ${props => (props.theme.primary ? props.theme.primary : "blue")};
		}
	}
`;

export default class SingleUserApplicationStyles extends Component {
	render() {
		return <SingleUserApplication>{this.props.children}</SingleUserApplication>;
	}
}
