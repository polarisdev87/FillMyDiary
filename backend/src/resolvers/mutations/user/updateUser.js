const updateUser = async function(parent, args, ctx, info) {
	// Check if they ar elogged in
	if (!ctx.request.userId) {
		throw new Error(`You must be logged in!`);
	}

	// Check if the current logged in user is editing, or admin
	const isUser = args.id === ctx.request.userId;

	const hasPermissions = ctx.request.user.permissions.some(permission =>
		[`ADMIN`, `ITEMDELETE`].includes(permission)
	);

	if (!isUser) {
		if (!hasPermissions)
			throw new Error(`You don't have permission to do that`);
	}

	const updates = { ...args };
	delete updates.id;

	var updatedUser;

	// Process job's trade information
	const trades = updates.trades;

	if (trades !== undefined) {
		if (trades.length === 0) throw new Error(`No trades have been selected.`);

		delete updates.trades;

		// Map Trades to an array which can be used in data connection (Many to One relationsip between trades to user)
		const newTrades = trades.map(trade => ({ id: trade }));

		// Get the user creating the application
		const user = await ctx.db.query.user(
			{
				where: {
					id: args.id
				}
			},
			`{ trades { id } }`
		);

		// If user has trades then remove them
		if (user.trades !== NaN || user.trades !== null || user.trades !== []) {
			const userTradesRemoval = ctx.db.mutation.updateUser(
				{
					data: {
						trades: {
							disconnect: user.trades
						}
					},
					where: {
						id: args.id
					}
				},
				info
			);
		}
		updatedUser = ctx.db.mutation.updateUser(
			{
				data: {
					trades: {
						connect: newTrades
					},
					...updates
				},
				where: {
					id: args.id
				}
			},
			info
		);
	} else {
		updatedUser = ctx.db.mutation.updateUser(
			{
				data: {
					...updates
				},
				where: {
					id: args.id
				}
			},
			info
		);
	}

	return updatedUser;
};

exports.updateUser = updateUser;
