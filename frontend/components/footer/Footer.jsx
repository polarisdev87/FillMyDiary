import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";

import { getWordPressData, getWordPressDataMenu } from "../../commonFunctions";
import { device } from "../../lib/MediaQueries";

import Link from "../atomic/atoms/Link";

import NavigationList from "../atomic/molecules/NavigationList";

import FooterStyles from "./styles/FooterStyles";

const Logo = styled.h1`
	margin: 0 auto 0 0;
	position: relative;

	a {
		display: block;
		padding: 1rem;
		background: ${props => props.theme.primary};
		color: black;
		text-transform: uppercase;
		text-decoration: none;
	}
`;

export default class Footer extends Component {
	state = {
		menus: {},
		options: {}
	};
	gettingMenus = false;

	async componentDidMount() {
		let menus = await this.menusWordPress();

		if (this.gettingMenus) {
			const {
				menuAboutUs,
				menuBuilders,
				menuInsights,
				menuSecondary,
				menuTradespeople,
				optionsData
			} = menus;
			this.setState({
				menus: {
					menuAboutUs,
					menuBuilders,
					menuInsights,
					menuSecondary,
					menuTradespeople
				},
				options: optionsData
			});
		}
	}

	componentWillUnmount() {
		this.gettingMenus = false;
	}

	async menusWordPress() {
		this.gettingMenus = true;

		const menuAboutUs = await getWordPressDataMenu(`about-us`),
			menuBuilders = await getWordPressDataMenu(`builders`),
			menuInsights = await getWordPressDataMenu(`insights`),
			menuSecondary = await getWordPressDataMenu(`secondary-menu`),
			menuTradespeople = await getWordPressDataMenu(`tradespeople`);

		const optionsData = await getWordPressData(`options/v2/all`);

		return {
			menuAboutUs,
			menuBuilders,
			menuInsights,
			menuSecondary,
			menuTradespeople,
			optionsData
		};
	}

	render() {
		if (Object.keys(this.state.options).length !== 0) {
			var { facebook, linkedin, twitter } = this.state.options.social_media;
		}
		return (
			<FooterStyles>
				<Container className="footer__contents" fluid>
					<Row>
						<Col sm={12} lg={12}>
							<hr className="hr hr--700" />
						</Col>
						<Col sm={6} lg={3} className="nav">
							<nav>
								<h4>For Tradespeople</h4>
								<NavigationList
									menuObject={this.state.menus.menuTradespeople}
								/>
							</nav>
						</Col>
						<Col sm={6} lg={3} className="nav">
							<nav>
								<h4>For Builders</h4>
								<NavigationList menuObject={this.state.menus.menuBuilders} />
							</nav>
						</Col>
						<Col sm={6} lg={3} className="nav">
							<nav>
								<h4>About Us</h4>
								<NavigationList menuObject={this.state.menus.menuAboutUs} />
							</nav>
						</Col>
						<Col sm={6} lg={3} className="nav">
							<nav>
								<h4>Insights</h4>
								<NavigationList
									prefix="/blog?slug="
									menuObject={this.state.menus.menuInsights}
								/>
							</nav>
						</Col>
					</Row>
					<Row>
						<Col sm={12} lg={12}>
							<hr className="hr hr--700" />
						</Col>
						<Col sm={12} lg={12}>
							<nav className="footer__secondary">
								<NavigationList menuObject={this.state.menus.menuSecondary} />
								<ul className="footer__social">
									<li>
										<a href={twitter} target="_blank">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
											>
												<path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
											</svg>
											Twitter
										</a>
									</li>
									<li>
										<a href={facebook} target="_blank">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 448 512"
											>
												<path d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z" />
											</svg>
											Facebook
										</a>
									</li>
									<li>
										<a href={linkedin} target="_blank">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 448 512"
											>
												<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
											</svg>{" "}
											LinkedIn
										</a>
									</li>
								</ul>
							</nav>
						</Col>
						<Col sm={12} lg={12}>
							<hr className="hr hr--small hr--700" />
						</Col>
					</Row>
				</Container>
			</FooterStyles>
		);
	}
}
