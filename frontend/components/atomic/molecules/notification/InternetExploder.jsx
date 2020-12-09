import React, { Component } from "react";
import styled from "styled-components";

import { device } from "../../../../lib/MediaQueries";

const InternetExploder = styled.div`
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 9999;

	background-color: ${props =>
		props.theme.purple900 ? props.theme.purple900 : "#16004d"};
	color: ${props => (props.theme.white ? props.theme.white : "#fff")};
	font-size: 12px;

	@media ${device.sm} {
		font-size: 14px;
	}

	button,
	.button {
		min-width: 200px;

		background-color: ${props =>
			props.theme.white ? props.theme.white : "#fff"};
		color: ${props =>
			props.theme.purple900 ? props.theme.purple900 : "#16004d"};
	}

	h3 {
		margin-bottom: 0;
		margin-top: 0;
	}

	p {
		margin: 16px 0;
		max-width: 500px;

		@media ${device.sm} {
			margin-bottom: 0;
		}
	}

	li + li {
		margin-top: 8px;
	}

	ul {
		padding-left: 0;

		list-style: none;
	}

	.ie__contents {
		margin: 0 auto;
		max-width: 1566px;
		padding: 50px;

		@media ${device.sm} {
			padding: 100px;
		}
	}
`;

export default class InternetExploderComponent extends Component {
	render() {
		const { ua } = this.props;

		if (ua.browser.name !== "IE") return null;

		return (
			<InternetExploder>
				<div className="ie__contents">
					{ua.browser.name === "IE" && (
						<h3>We do not support Internet Explorer</h3>
					)}
					<div className="ie__wrapper">
						<p>
							This site uses latest technologies available to deliver the
							highest quality service to our users as possible, unfortunately as
							a result, it is almost impossible to support older browsers.
						</p>
						<p>
							Upgrade your browser experience with one of the following
							browsers:
						</p>
						<ul>
							<li>
								<a
									className="button"
									href="https://www.microsoft.com/en-gb/windows/microsoft-edge"
									target="_blank"
								>
									Microsoft Edge
								</a>
							</li>
							<li>
								<a
									className="button"
									href="https://www.google.com/chrome/"
									target="_blank"
								>
									Google Chrome
								</a>
							</li>
							<li>
								<a
									className="button"
									href="https://www.mozilla.org/en-GB/firefox/new/"
									target="_blank"
								>
									Mozilla Firefox
								</a>
							</li>
							<li>
								<a
									className="button"
									href="https://www.opera.com/"
									target="_blank"
								>
									Opera
								</a>
							</li>
						</ul>
					</div>
				</div>
			</InternetExploder>
		);
	}
}
