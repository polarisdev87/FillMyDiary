import React, { Component } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import styled from "styled-components";

import { getWordPressDataMenu } from "../../commonFunctions";
import { device } from "../../lib/MediaQueries";

import CurrentUser from "../queries/user/CurrentUser";

import Link from "../atomic/atoms/Link";

import HeaderCTA from "./parts/HeaderCTA";
import NavigationList from "../atomic/molecules/NavigationList";

Router.onRouteChangeStart = () => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => {
	NProgress.done();
};
Router.onRouteChangeError = () => {
	NProgress.done();
};

const Logo = styled.h4`
	margin: 0;
	position: relative;

	a {
		display: block;

		color: black;
		font-weight: 700;
		text-transform: uppercase;
		text-decoration: none;

		&:active,
		&:focus,
		&:hover {
			text-decoration: none;
		}
	}
`;

const StyledHeader = styled.header`
	position: relative;
	z-index: 999;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);

	a {
		display: block;

		color: ${props => (props.theme.grey600 ? props.theme.grey600 : "#595959")};
		font-size: 18px;
		font-weight: 500;
		line-height: 27px;
		text-decoration: none;
		transition: 0.2s all ease;

		&:active,
		&:focus,
		&:hover {
			color: ${props => (props.theme.black ? props.theme.black : "#141213")};
			text-decoration: none;
		}
	}

	button {
		align-items: center;
		display: flex;
		margin: 0;
		min-width: 0;
		padding: 0;

		background: none;
		border: none;
		color: ${props => (props.theme.black ? props.theme.black : "#141213")};
		font-weight: 500;
		font-size: 18px;
		line-height: 27px;

		@media ${device.md} {
			display: none;
		}

		span {
			margin-left: 4px;
		}
	}

	img {
		display: block;
		width: 50px;
	}

	nav {
		a,
		button {
			padding: 8px 0;

			@media ${device.md} {
				padding: 0 16px;
			}
		}

		ul {
			display: flex;
			flex-direction: column;
			margin: 0;
			padding: 0;

			list-style: none;

			@media ${device.md} {
				flex-direction: row;
			}
		}
	}

	svg {
		max-height: 24px;
		width: 24px;
	}

	.active {
		color: ${props => (props.theme.black ? props.theme.black : "#141213")};
	}

	.header__close {
		margin-bottom: 16px;
	}

	.header__cta {
		position: relative;

		span {
			display: none;

			@media ${device.MXxl} {
				display: inline;
			}
		}

		span + span {
			display: none;

			@media ${device.xl} {
				display: inline;
			}
		}
	}

	.header__contents {
		margin: 0 auto;
		max-width: 1566px;
		padding: 8px 15px;

		@media ${device.sm} {
			padding: 8px 45px;
		}

		@media ${device.MXmd} {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}

		> .header__logo {
			display: none;

			@media ${device.MXmd} {
				display: block;
			}
		}
	}

	.header__navigation {
		align-items: center;
		display: flex;
		justify-content: space-between;

		@media ${device.MXmd} {
			align-items: flex-start;
			flex-direction: column;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch; // mobile safari
			min-height: 100%;
			justify-content: flex-start;
			left: 0;
			padding: 24px 32px;
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 99999;

			background-color: white;
			transition: 0.4s left ease;

			&.navigation--hide {
				left: 100%;
			}

			.header__cta {
				margin-top: 8px;
				padding-top: 8px;

				border-top: 1px solid #d9d9d9;
			}

			& > * {
				width: 100%;
			}

			img {
				display: none;
			}
		}
	}

	.header__open {
		span {
			display: none;

			@media ${device.xs} {
				display: inline;
			}
		}
	}
`;

export default class Header extends Component {
	state = { showMenu: false, menus: {} };
	gettingMenus = false;

	async componentDidMount() {
		let menus = await this.menusWordPress();

		if (this.gettingMenus) {
			const { menuHeader, menuLoggedIn } = menus;
			this.setState({
				menus: {
					menuHeader,
					menuLoggedIn
				}
			});
		}
	}

	componentWillUnmount() {
		this.gettingMenus = false;
	}

	async menusWordPress() {
		this.gettingMenus = true;

		const menuHeader = await getWordPressDataMenu(`header-menu`);
		const menuLoggedIn = await getWordPressDataMenu(`header-menu-logged-in`);

		return { menuHeader, menuLoggedIn };
	}

	handleClick = () => {
		this.setState({
			showMenu: !this.state.showMenu
		});
	};

	render() {
		const { currentUser } = this.props;

		return (
			<StyledHeader>
				<div className="header__contents">
					<Logo className="header__logo">
						<Link href="/">
							<a>
								<img src="/static/logo.png" alt="Fill My Diary Logo" />
							</a>
						</Link>
					</Logo>
					<button className="header__open" onClick={this.handleClick}>
						Menu<span>Navigation</span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
							<path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
						</svg>
					</button>
					<nav
						className={
							this.state.showMenu
								? "header__navigation navigation--show"
								: "header__navigation navigation--hide"
						}
					>
						<button className="header__close" onClick={this.handleClick}>
							Close<span>Navigation</span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
								<path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
							</svg>
						</button>
						<Logo className="header__logo">
							<Link href="/">
								<a>
									<img src="/static/logo.png" alt="Fill My Diary Logo" />
								</a>
							</Link>
						</Logo>
						{!currentUser && (
							<NavigationList menuObject={this.state.menus.menuHeader} />
						)}
						{currentUser && (
							<NavigationList menuObject={this.state.menus.menuLoggedIn} />
						)}
						<HeaderCTA
							menu={this.state.menus.menuLoggedIn}
							user={currentUser}
						/>
					</nav>
				</div>
			</StyledHeader>
		);
	}
}
