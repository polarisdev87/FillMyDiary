import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import "moment/locale/en-gb";

import Link from "../atomic/atoms/Link";

import NavigationList from "../atomic/molecules/NavigationList";

const StyledHeader = styled.header`
	left: 50%;
	margin-bottom: 32px;
	margin-left: -50vw;
	position: relative;
	width: 100vw;
	color: ${props => (props.theme.white ? props.theme.white : "#FFF")};

	a {
		display: block;
		padding: 0 8px;

		color: ${props => (props.theme.black ? props.theme.black : "#FFF")};
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 18px;
		text-decoration: none;
		text-transform: uppercase;
		transition: 0.2s all ease;

		&:active,
		&:focus,
		&:hover {
			color: ${props => (props.theme.grey600 ? props.theme.grey600 : "#FFF")};
		}
	}

	img {
		width: 60px;
	}

	li {
		&:last-of-type {
			a {
				padding-right: 0;
			}
		}
	}

	nav {
		ul {
			display: flex;
			flex-direction: row;
			margin: 0;
			padding: 0;

			list-style: none;
		}
	}

	svg {
		max-height: 24px;
		width: 24px;
	}

	.active {
		color: ${props => (props.theme.black ? props.theme.black : "#141213")};
	}

	.header__contents {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		max-width: 1566px;
		padding: 24px 15px;
		width: 100%;

		color: ${props => (props.theme.black ? props.theme.black : "#141213")};
	}
`;

const today = new Date();

const adminURL = "admin-manager";

export default class Header extends Component {
	state = {
		menus: [
			{
				content: [
					{
						item_id: 2,
						title: "Queue",
						url: `/${adminURL}/queue`
					},
					{
						item_id: 3,
						title: "User Management",
						url: `/${adminURL}/user-management`
					},
					{
						item_id: 4,
						title: "Job Management",
						url: `/${adminURL}/job-management`
					},
					{
						item_id: 5,
						title: "Reporting",
						url: `/${adminURL}/reporting`
					},
					{
						item_id: 6,
						title: "Payments",
						url: `/${adminURL}/payments`
					},
					{
						item_id: 8,
						title: "WordPress",
						url: `https://fmd.noface.app/letickulwhisledineremicese`
					}
				]
			}
		]
	};

	render() {
		return (
			<StyledHeader>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="header__contents">
								<span>{moment(today).format("DD/MM/YYYY")}</span>
								<nav>
									<NavigationList menuObject={this.state.menus[0]} />
								</nav>
							</div>
						</div>
					</div>
				</div>
			</StyledHeader>
		);
	}
}
