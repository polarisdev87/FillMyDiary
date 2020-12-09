import React, { Component } from "react";
import Head from "next/head";

import { SITEURL } from "../../../config";

export default class SEO extends Component {
	render() {
		const { yoast } = this.props;

		var pageTitle = `Fill My Diary`;

		if (yoast) {
			const { description, image, slug, title } = yoast;
			const pageURL = SITEURL + slug;

			if (title) {
				pageTitle = `Fill My Diary - ${title}`;
			}

			return (
				<Head>
					<title>{pageTitle}</title>
					<meta
						name="description"
						content={
							description
								? description
								: `No registration fees, subscriptions, buying leads, timewasters or quoting for work you might not get.`
						}
					/>
					<link
						rel="canonical"
						href={pageURL ? pageURL : `https://fillmydiary.co.uk/`}
					/>
					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="website" />
					<meta
						property="og:title"
						content={pageTitle ? pageTitle : `Fill My Diary`}
					/>
					<meta
						property="og:description"
						content={
							description
								? description
								: `No registration fees, subscriptions, buying leads, timewasters or quoting for work you might not get.`
						}
					/>
					<meta
						property="og:url"
						content={pageURL ? pageURL : `https://fillmydiary.co.uk/`}
					/>
					<meta property="og:site_name" content="fillmydiary.co.uk" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta
						name="twitter:description"
						content={
							description
								? description
								: `No registration fees, subscriptions, buying leads, timewasters or quoting for work you might not get.`
						}
					/>
					<meta
						name="twitter:title"
						content={pageTitle ? pageTitle : `Fill My Diary`}
					/>
					{image && <meta name="twitter:image" content={image} />}
				</Head>
			);
		}

		return (
			<Head>
				<title>{pageTitle}</title>
				<meta
					name="description"
					content={`No registration fees, subscriptions, buying leads, timewasters or quoting for work you might not get.`}
				/>
				<link rel="canonical" href={`https://fillmydiary.co.uk/`} />
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={`Fill My Diary`} />
				<meta
					property="og:description"
					content={`No registration fees, subscriptions, buying leads, timewasters or quoting for work you might not get.`}
				/>
				<meta property="og:url" content={`https://fillmydiary.co.uk/`} />
				<meta property="og:site_name" content="fillmydiary.co.uk" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:description"
					content={`No registration fees, subscriptions, buying leads, timewasters or quoting for work you might not get.`}
				/>
				<meta name="twitter:title" content={`Fill My Diary`} />
			</Head>
		);
	}
}
