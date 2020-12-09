const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
	application: forwardTo("db"),
	async applications(parent, args, ctx, info) {
		// Only add user verification for query on live site
		if (process.env.SERVER_ENV !== "local") {
			// Check if there is a current user
			if (!ctx.request.userId) {
				throw new Error("You must be logged in!");
			}
			// Return the users
			return ctx.db.query.applications({}, info);
		} else {
			return ctx.db.query.applications({}, info);
		}
	},
	job: forwardTo("db"),
	jobs: forwardTo("db"),
	me(parent, args, ctx, info) {
		// Check if there is a current user ID
		if (!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user(
			{
				where: { id: ctx.request.userId }
			},
			info
		);
	},
	order: forwardTo("db"),
	async orders(parent, args, ctx, info) {
		// Only add user verification for query on live site
		if (process.env.SERVER_ENV !== "local") {
			// Check if there is a current user
			if (!ctx.request.userId) {
				throw new Error("You must be logged in!");
			}
			// Return the users
			return ctx.db.query.orders({}, info);
		} else {
			return ctx.db.query.orders({}, info);
		}
	},
	review: forwardTo("db"),
	reviews: forwardTo("db"),
	setting: forwardTo("db"),
	async settings(parent, args, ctx, info) {
		// Only add user verification for query on live site
		if (process.env.SERVER_ENV !== "local") {
			// Check if there is a current user
			if (!ctx.request.userId) {
				throw new Error("You must be logged in!");
			}
			// Check if the user has the permissions to query all the users
			hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
			// Return the users
			return ctx.db.query.settings({}, info);
		} else {
			return ctx.db.query.settings({}, info);
		}
	},
	trade: forwardTo("db"),
	trades: forwardTo("db"),
	user: forwardTo("db"),
	async users(parent, args, ctx, info) {
		// Only add user verification for query on live site
		if (process.env.SERVER_ENV !== "local") {
			// Check if there is a current user
			if (!ctx.request.userId) {
				throw new Error("You must be logged in!");
			}
			// Check if the user has the permissions to query all the users
			hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
			// Return the users
			return ctx.db.query.users({}, info);
		} else {
			return ctx.db.query.users({}, info);
		}
	}
};

module.exports = Query;
