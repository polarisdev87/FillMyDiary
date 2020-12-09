import React, { Component } from "react";
import styled from "styled-components";

import { device } from "../../../lib/MediaQueries";

const FooterStyles = styled.footer`
	padding: 48px 15px;

	background-color: ${props =>
		props.theme.blackAbsolute ? props.theme.blackAbsolute : "#000"};
	color: ${props => (props.theme.white ? props.theme.white : "#FFF")};

	@media ${device.sm} {
		padding: 48px 45px;
	}

	[target="_blank"] {
		text-decoration: none;

		&:hover {
			text-decoration: none;
		}
	}

	a {
		display: block;
		padding: 4px 0;

		color: ${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};
		fill: ${props => (props.theme.grey500 ? props.theme.grey500 : "#737373")};
		font-size: 14px;
		letter-spacing: 1px;
		text-decoration: none;
		text-transform: uppercase;
		transition: 0.2s all ease;

		&:active,
		&:focus,
		&:hover {
			color: ${props => (props.theme.white ? props.theme.white : "#FFF")};
			fill: ${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};
		}
	}

	h4 {
		margin-top: 0;

		font-size: 20px;
		text-transform: capitalize;
	}

	hr {
		margin: 0 auto;

		opacity: 0.1;
	}

	nav {
		margin: 48px auto 0;
	}

	svg {
		height: 24px;
	}

	ul {
		margin: 0;
		padding: 0;

		list-style: none;
	}

	.footer__contents {
		max-width: 1476px;
	}

	.footer__secondary {
		display: flex;
		flex-direction: column;
		margin: 24px auto;

		@media ${device.sm} {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		li {
			& + li {
				margin-top: 8px;

				@media ${device.md} {
					margin-left: 8px;
					margin-top: 0;
					padding-left: 8px;

					border-left: 1px solid
						${props => (props.theme.grey900 ? props.theme.grey900 : "#00244d")};
				}
			}
		}

		ul {
			display: flex;
			flex-direction: column;
			width: 100%;

			@media ${device.md} {
				flex-direction: row;
				justify-content: center;
			}

			@media ${device.xl} {
				width: auto;
			}
		}

		.footer__social {
			flex-direction: row;
			margin-top: 16px;

			@media ${device.xl} {
				margin-top: 0;
			}

			a {
				font-size: 0px;
			}

			li {
				max-width: 32px;
			}

			li + li {
				margin-left: 8px;
				margin-top: 0px;

				border: none;
			}
		}
	}

	.nav {
		margin: 32px auto;

		@media ${device.xs} {
			margin: 32px auto 0;
		}

		@media ${device.md} {
			margin: 32px auto 32px;
		}

		+ .nav,
		+ .nav + .nav {
			@media ${device.xs} {
				margin: 32px auto;
			}
		}

		nav {
			margin: 0;
		}
	}

	.row {
		+ .row {
			margin-top: 48px;
		}
	}
`;

export default class FooterStylesElement extends Component {
	render() {
		return <FooterStyles>{this.props.children}</FooterStyles>;
	}
}
