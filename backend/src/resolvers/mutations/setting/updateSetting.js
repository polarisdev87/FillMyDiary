const updateSetting = async function(parent, args, ctx, info) {
	// Check if they ar elogged in
	if (!ctx.request.userId) {
		throw new Error(`You must be logged in!`);
	}

	const hasPermissions = ctx.request.user.permissions.some(permission =>
		[`ADMIN`].includes(permission)
	);

	if (!hasPermissions) throw new Error(`You don't have permission to do that`);

	// Create a copy of the updates from arguments parameter
	const value = args.value;

	return ctx.db.mutation.updateSetting(
		{
			data: {
				value
			},
			where: {
				id: args.id
			}
		},
		info
	);
};

exports.updateSetting = updateSetting;
