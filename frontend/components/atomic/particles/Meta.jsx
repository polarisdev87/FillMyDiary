import Head from "next/head";
import React, { Component } from "react";

class Meta extends Component {
	render() {
		return (
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/static/icons/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/static/icons/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/static/icons/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/static/icons/favicon/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/static/icons/favicon/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<meta name="msapplication-TileColor" content="#ffc40d" />
				<meta name="theme-color" content="#ffffff" />
				<link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
				<link rel="stylesheet" type="text/css" href="/static/normalize.css" />
				<title>Fill My Diary</title>
			</Head>
		);
	}
}

export default Meta;
