const { hasPermission } = require(`../../../utils`);

const updatePermissions = async function(parent, args, ctx, info) {
	// Check if they ar elogged in
	if (!ctx.request.userId) {
		throw new Error(`You must be logged in!`);
	}
	// Query the currents user
	const currentUser = await ctx.db.query.user(
		{
			where: { id: ctx.request.userId }
		},
		info
	);
	// Check if they have permissions to do this
	hasPermission(currentUser, [`ADMIN`, `PERMISSIONUPDATE`]);
	// Update the permissions
	return ctx.db.mutation.updateUser(
		{
			data: {
				permissions: {
					set: args.permissions
				}
			},
			where: {
				id: args.userId
			}
		},
		info
	);
};

exports.updatePermissions = updatePermissions;
