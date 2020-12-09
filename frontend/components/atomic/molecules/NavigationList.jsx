import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

import { decodeHTML } from "../../helpers";

import Link from "../atoms/Link";

const StyledNavigationList = styled.ul`
	margin: 0;
	padding: 0;

	list-style: none;
`;

export default class NavigationList extends Component {
	processURL(URL, prefix) {
		if (URL.length > 1) {
			URL.substring(URL.length - 1) == "/"
				? (URL = URL.substring(0, URL.length - 1))
				: null;
		}
		if (prefix) {
			URL = URL.substr(1);
			URL = prefix + URL;
		}
		return URL;
	}

	render() {
		const { menuObject, prefix } = this.props;

		if (this.props.menuObject) {
			return (
				<StyledNavigationList>
					{menuObject &&
						menuObject.content.map(item => {
							const external = item.url.includes("https://fmd.noface.app/");

							if (external) {
								return (
									<li key={item.item_id}>
										<a href={this.processURL(item.url, prefix)} target="_blank">
											<a>{decodeHTML(item.title)}</a>
										</a>
									</li>
								);
							}

							return (
								<li key={item.item_id}>
									<Link href={this.processURL(item.url, prefix)}>
										<a>{decodeHTML(item.title)}</a>
									</Link>
								</li>
							);
						})}
				</StyledNavigationList>
			);
		}
		return null;
	}
}
