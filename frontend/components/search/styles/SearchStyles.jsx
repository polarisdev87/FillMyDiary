import React, { Component } from "react";
import styled from "styled-components";
import { device } from "../../../lib/MediaQueries";

const SearchStyles = styled.section`
	h2,
	h3 {
		margin-top: 0;

		font-size: 18px;
		font-weight: 500;
		line-height: 1.5;
	}

	button,
	input {
		display: block;
		margin-top: 0;
		width: 100%;
	}

	p {
		font-size: 16px;
		line-height: 1.5;
	}

	section {
		margin-bottom: 32px;
		padding: 24px 16px;

		background-color: ${props =>
			props.theme.white ? props.theme.white : "#FFF"};
		border-radius: 8px;
		box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

		@media ${device.lg} {
			margin-bottom: 0;
		}
	}

	.search__count {
		margin-bottom: 32px;
		margin-top: 64px;
		padding: 0;

		background: none;
		box-shadow: none;
	}

	.search__filters {
		min-height: 700px;
		padding: 0 0 16px;

		.search__input {
			margin: 0 16px;
			padding: 16px 0;

			border-bottom: 1px solid #d9d9d9;
		}

		h2,
		h3 {
			margin: 0;
		}

		h3 {
			color: #141213;
			font-weight: bold;
		}

		header {
			align-items: center;
			display: flex;
			justify-content: space-between;
			padding: 16px;
		}

		input,
		input[type="date"],
		input[type="email"],
		input[type="number"],
		input[type="password"],
		input[type="tel"],
		input[type="text"],
		input[type="url"],
		select {
			margin-top: 0;
			min-height: 0px;

			border: none;
		}

		input[type="date"],
		input[type="email"],
		input[type="number"],
		input[type="password"],
		input[type="tel"],
		input[type="text"],
		input[type="url"],
		select {
			padding: 8px 0;
		}

		input[type="text"] {
			padding: 8px 0;
		}

		label {
			font-weight: 500;
			font-size: 14px;
		}

		.DateInput_input {
			font-size: 16px;
		}

		.DateInput {
			margin-top: 0;

			input {
				text-align: left;
			}
		}

		.search__dateFilter {
			align-items: flex-start;
			display: flex;

			.DateInput {
				width: 80px;
			}

			input {
				padding-right: 4px;

				font-size: 12px;
				text-align: right;
			}

			label {
				margin: 0 auto 0 0;
				padding: 8px 0;
				width: 100%;
			}
		}

		.input-group {
			display: flex;

			border: 1px solid
				${props => (props.theme.grey100 ? props.theme.grey100 : "lightgrey")};
		}

		.input-group__append {
			align-items: center;
			display: flex;
			justify-content: center;
			padding: 8px;

			background: ${props =>
				props.theme.grey100 ? props.theme.grey100 : "lightgrey"};

			+ input {
				padding: 8px;
			}
		}
	}
`;

export default class SearchStylesElement extends Component {
	render() {
		return <SearchStyles>{this.props.children}</SearchStyles>;
	}
}
