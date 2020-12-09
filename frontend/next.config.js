// next.config.js
const withSass = require("@zeit/next-sass");

module.exports = withSass({
	webpack: cfg => {
		const originalEntry = cfg.entry;
		cfg.entry = async () => {
			const entries = await originalEntry();

			if (
				entries["main.js"] &&
				!entries["main.js"].includes("./lib/polyfills.js")
			) {
				entries["main.js"].unshift("./lib/polyfills.js");
			}

			return entries;
		};

		return cfg;
	}
});
