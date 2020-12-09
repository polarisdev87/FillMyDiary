import React from "react";
import * as Sentry from "@sentry/browser";

import { getWordPressDataPage } from "../commonFunctions";

import CreateMarkup from "../components/atomic/particles/CreateMarkup";

/**
 * Send an error event to Sentry.
 *
 * Server-side:
 * Next.js captures SSR errors and never passes them to the Sentry
 * middleware. It does, however, render the _error.js component, so
 * we can manually fire Sentry events here.
 *
 * Client-side:
 * Unhandled client exceptions will always bubble up to the _error.js
 * component, so we can manually fire events here.
 */

Sentry.init({
	dsn: "https://2e2ca0ebb2b940c2840713b515812289@sentry.io/1411909"
});

const notifySentry = (err, req, statusCode) => {
	Sentry.configureScope(scope => {
		if (!req) {
			scope.setTag(`ssr`, false);
		} else {
			scope.setTag(`ssr`, true);
			scope.setExtra(`url`, req.url);
			scope.setExtra(`params`, req.params);
			scope.setExtra(`query`, req.query);
			scope.setExtra(`statusCode`, statusCode);
			scope.setExtra(`headers`, req.headers);

			if (req.user) {
				scope.setUser({ id: req.user.id, email: req.user.email });
			}
		}
	});

	Sentry.captureException(err);
};

export default class Error extends React.Component {
	static async getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null;
		const data = await getWordPressDataPage(`error-404`);

		notifySentry(err, req, statusCode);

		return { data, statusCode };
	}

	render() {
		const content = this.props.data.content.content;

		return <CreateMarkup pageHTML={content} />;
	}
}
