import React, { Component } from "react";
import styled from "styled-components";

import Link from "../../atomic/atoms/Link";

import UserLogout from "../../users/UserLogout";

const HeaderActionsElement = styled.nav`
	position: relative;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	color: ${props => (props.theme.black ? props.theme.black : "#141213")};

	@media (min-width: ${props => (props.theme.md ? props.theme.md : "992px")}) {
		padding: 16px;
		position: absolute;
		right: 4000px;
		top: 100%;
		z-index: -1;

		box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
			0 30px 60px -30px rgba(0, 0, 0, 0.3);
		opacity: 0;
		transition: 0.2s opacity ease;

		@media (min-width: 1566px) {
			transform: translateX(50%);
		}

		a,
		button {
			font-size: 14px;
		}
	}

	button.button--secondary {
		display: block;
		width: 100%;

		color: ${props => (props.theme.grey600 ? props.theme.grey600 : "#595959")};
		text-align: left;
		transition: 0.2s all ease;

		&:active,
		&:focus,
		&:hover {
			color: ${props => (props.theme.black ? props.theme.black : "#141213")};
			text-decoration: none;
		}
	}
`;

export default class HeaderActions extends Component {
	render() {
		const { user } = this.props;
		if (!user) return null;
		return (
			<HeaderActionsElement className="header__actions">
				{user.permissions.includes("ADMIN") && (
					<Link
						href={{
							pathname: "/admin-manager/queue"
						}}
					>
						<a>Admin</a>
					</Link>
				)}
				<Link
					href={{
						pathname: "/user",
						query: { id: user.id }
					}}
				>
					<a>My Profile</a>
				</Link>
				<Link
					href={{
						pathname: "/user",
						query: { id: user.id }
					}}
				>
					<a>Applications</a>
				</Link>
				<Link
					href={{
						pathname: "/user/update",
						query: { id: user.id }
					}}
				>
					<a>Edit Profile</a>
				</Link>
				<UserLogout />
			</HeaderActionsElement>
		);
	}
}
