import React, { Component } from "react";
import styled from "styled-components";
import { device } from "../../../lib/MediaQueries";

import Link from "../../atomic/atoms/Link";

import NavigationList from "../../atomic/molecules/NavigationList";

import HeaderActions from "./Actions";

const HeaderMobileMenu = styled.div`
	display: none;
`;

const UserMeta = styled.nav`
	position: relative;

	@media ${device.lg} {
		&:hover {
			.header__actions {
				right: 0;

				opacity: 1;
				z-index: 1;

				@media (min-width: 1566px) {
					right: 50%;
				}
			}
		}
	}
`;

export default class HeaderCTA extends Component {
	render() {
		const { menu, user } = this.props;

		return (
			<>
				<HeaderMobileMenu className="header__mobile">
					{user && <NavigationList menuObject={menu} />}
				</HeaderMobileMenu>
				<div className="header__cta">
					{!user && (
						<Link href="/login">
							<a>
								<span>Account</span>
								<span>Login</span>
							</a>
						</Link>
					)}
					{user && (
						<UserMeta>
							<Link
								href={{
									pathname: "/user",
									query: { id: user.id }
								}}
							>
								<a>{user.name}</a>
							</Link>
							<HeaderActions user={user} />
						</UserMeta>
					)}
				</div>
			</>
		);
	}
}
