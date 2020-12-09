import App, { Container } from "next/app";
import Page from "../components/templates/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import Router from "next/router";
import withGA from "next-ga";
import { ScreenClassProvider } from "react-grid-system";
import parser from "ua-parser-js";

import { getWordPressDataPage } from "../commonFunctions";

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		// Exposes the query to the user
		pageProps.query = ctx.query;

		if (ctx.req) {
			if (ctx.req.headers["user-agent"]) {
				pageProps.ua = parser(ctx.req.headers["user-agent"]);
			}
		}

		return { pageProps };
	}

	render() {
		const { Component, apollo, pageProps } = this.props;
		var background = `default`;
		var yoastObject;
		const { ua } = pageProps;

		if (pageProps.content) {
			const { grey_background, slug, yoast } = pageProps.content;

			grey_background ? (background = `grey`) : null;
			yoast ? (yoastObject = yoast) : null;
		}

		return (
			<Container>
				<ApolloProvider client={apollo}>
					<ScreenClassProvider>
						<Page background={background} ua={ua} yoast={yoastObject}>
							<Component {...pageProps} />
						</Page>
					</ScreenClassProvider>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withGA("UA-134145730-1", Router)(withData(MyApp));
