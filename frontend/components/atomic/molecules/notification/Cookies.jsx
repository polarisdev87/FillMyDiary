import React, { Component } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
const cookies = new Cookies();

import {
	getWordPressData,
	getWordPressDataMenu
} from "../../../../commonFunctions";
import { APIURL } from "../../../../config";
import { device } from "../../../../lib/MediaQueries";

import Link from "../../atoms/Link";

const CookiesNotification = styled.div`
	&.cookies--hide {
		opacity: 0;

		transform: translateY(100%);
	}

	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 9999;

	background-color: ${props =>
		props.theme.purple900 ? props.theme.purple900 : "#16004d"};
	color: ${props => (props.theme.white ? props.theme.white : "#fff")};
	font-size: 12px;
	opacity: 1;
	transform: translateY(0%);
	transition: 0.2s all ease;

	@media ${device.sm} {
		font-size: 14px;
	}

	a {
		color: ${props => (props.theme.white ? props.theme.white : "#fff")};
	}

	button,
	.button {
		background-color: ${props =>
			props.theme.white ? props.theme.white : "#fff"};
		color: ${props =>
			props.theme.purple900 ? props.theme.purple900 : "#16004d"};
	}

	h4 {
		margin-bottom: 0;
		margin-top: 0;
	}

	p {
		margin: 16px 0;
		max-width: 600px;

		@media ${device.sm} {
			margin-bottom: 0;
		}

		@media ${device.lg} {
			max-width: 900px;
		}
	}

	.cookie__contents {
		margin: 0 auto;
		max-width: 1566px;
		padding: 16px 15px;

		@media ${device.sm} {
			padding: 32px 15px;
		}
	}

	.cookies__wrapper {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		@media ${device.sm} {
			flex-direction: row;
		}
	}
`;

export default class CookiesComponent extends Component {
	async componentDidMount() {
		let options = await this.fetchData();

		if (this.gettingData) {
			if (!cookies.get("fill-my-diary-CookiesAcceptance"))
				this.setState({ accepted: false });

			this.setState({ options });
		}
	}

	componentWillUnmount() {
		this.gettingData = false;
	}

	async fetchData() {
		this.gettingData = true;

		const optionsData = await getWordPressData(`options/v2/all`);
		return optionsData;
	}

	state = {
		accepted: true
	};

	acceptCookies = () => {
		cookies.set("fill-my-diary-CookiesAcceptance", true, { path: "/" });
		this.setState({ accepted: true });
	};

	render() {
		return (
			<CookiesNotification
				className={this.state.accepted ? `cookies cookies--hide` : `cookies`}
			>
				<div className="cookie__contents">
					<h4>
						{this.state.options && this.state.options.cookies_heading
							? this.state.options.cookies_heading
							: `Cookies 🍪`}
					</h4>
					<div className="cookies__wrapper">
						{this.state.options && this.state.options.cookies_content ? (
							<div
								dangerouslySetInnerHTML={{
									__html: this.state.options.cookies_content
								}}
							/>
						) : (
							<p>
								This site uses cookies. Cookies help us remember your
								preferences (e.g. hiding this popup), keep this site running
								fast and help us improve our site (analytics).{` `}
								<Link href="/privacy-policy">
									<a>
										Click here to find out more on our cookies and privacy
										policy.
									</a>
								</Link>
							</p>
						)}
						<button onClick={this.acceptCookies}>That's fine by me</button>
					</div>
				</div>
			</CookiesNotification>
		);
	}
}
