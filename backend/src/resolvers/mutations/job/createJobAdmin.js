const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);

const createJobAdmin = async function(parent, args, ctx, info) {
	if (!ctx.request.userId) {
		throw new Error(`You must be logged in to do that!`);
	}

	const hasPermissions = ctx.request.user.permissions.some(permission =>
		[`ADMIN`].includes(permission)
	);

	if (!hasPermissions) throw new Error(`You don't have permission to do that`);

	const updates = { ...args };

	// Process job's trade information
	const trades = updates.trades;
	if (trades === undefined || trades.length == 0) {
		throw new Error(`Please select at least 1 trade for the job.`);
	}

	if (trades.length > 1) throw new Error(`Maximum of 1 trade allowed.`);

	delete updates.trades;
	delete updates.user;
	const reviewedByOwner = false;
	const reviewedByWorker = false;

	// Map Trades to an array which can be used in data connection (Many to One relationsip between trades to user)
	const newTrades = trades.map(trade => ({ id: trade }));

	const job = await ctx.db.mutation.createJob(
		{
			data: {
				// This is how we create a relationship between the item and the user
				user: {
					connect: {
						id: args.user
					}
				},
				trades: {
					connect: newTrades
				},
				reviewedByOwner,
				reviewedByWorker,
				...updates
			}
		},
		info
	);

	return job;
};

exports.createJobAdmin = createJobAdmin;
