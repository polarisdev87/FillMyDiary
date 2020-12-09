import React, { Component } from "react";
import styled from "styled-components";

const UserInformationElement = styled.div`
	margin-top: 64px;
	padding: 48px 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

	button,
	.button {
		display: block;
		width: 100%;
	}

	h1 {
		margin-bottom: 4px;

		color: #4285f4;
		font-weight: bold;
		line-height: 30px;
		font-size: 20px;
		text-align: center;
	}

	h2 {
		margin-top: 0;

		color: #141213;
		font-size: 14px;
		font-weight: 500;
		line-height: 21px;
		text-align: center;

		span {
			+ span {
				&:before {
					content: ", ";
				}
			}
		}
	}

	hr {
		margin: 32px 0;

		border: 1px solid #d9d9d9;
	}

	li {
		font-size: 16px;

		color: #595959;

		+ li {
			margin-top: 16px;
		}
	}

	p {
		line-height: 21px;
		font-size: 14px;
		text-align: center;

		color: #595959;
	}

	ul {
		margin: 24px 0;
		padding-left: 0;

		list-style: none;

		a {
			color: inherit;
			text-decoration: none;
			word-break: break-all;
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

	.user__avatar {
		align-items: center;
		border-radius: 50%;
		display: flex;
		height: 96px;
		justify-content: center;
		margin: 0 auto 32px;
		position: relative;
		width: 96px;

		border: 2px solid
			${props => (props.theme.primary ? props.theme.primary : "blue")};

		&:after {
			border-radius: 50%;
			content: "";
			display: block;
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;

			background: ${props =>
				props.theme.primary ? props.theme.primary : "blue"};
			opacity: 0.1;
		}

		svg {
			fill: ${props => (props.theme.primary ? props.theme.primary : "blue")};
			width: 50%;
		}
	}
`;

export default class UserInformationStyles extends Component {
	render() {
		return (
			<UserInformationElement>{this.props.children}</UserInformationElement>
		);
	}
}
