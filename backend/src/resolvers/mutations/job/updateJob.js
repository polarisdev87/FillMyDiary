const updateJob = async function(parent, args, ctx, info) {
	const updates = { ...args };
	delete updates.id;

	var updatedJob;

	// Process job's trade information
	const trades = updates.trades;

	if (trades !== undefined) {
		if (trades.length === 0) throw new Error(`No trades have been selected.`);
		if (trades.length > 1) throw new Error(`Maximum of 1 trade allowed.`);

		delete updates.trades;

		// Map Trades to an array which can be used in data connection (Many to One relationsip between trades to user)
		const newTrades = trades.map(trade => ({ id: trade }));

		// Get the user creating the application
		const job = await ctx.db.query.job(
			{
				where: {
					id: args.id
				}
			},
			`{ trades { id } }`
		);

		// If user has trades then remove them
		if (job.trades !== NaN || job.trades !== null || job.trades !== []) {
			const jobTradesRemoval = ctx.db.mutation.updateJob(
				{
					data: {
						trades: {
							disconnect: job.trades
						}
					},
					where: {
						id: args.id
					}
				},
				info
			);
		}
		updatedJob = ctx.db.mutation.updateJob(
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
		updatedJob = ctx.db.mutation.updateJob(
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

	return updatedJob;
};

exports.updateJob = updateJob;
