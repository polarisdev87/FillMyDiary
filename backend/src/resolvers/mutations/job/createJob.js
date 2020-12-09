const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);
const { allUserNotifications } = require(`./functions/allUserNotifications`);

const createJob = async function(parent, args, ctx, info) {
	if (!ctx.request.userId) {
		throw new Error(`You must be logged in to do that!`);
	}
	const updates = { ...args };

	// Process job's trade information
	const trades = updates.trades;
	if (trades === undefined || trades.length == 0) {
		throw new Error(`Please select at least 1 trade for the job.`);
	}

	if (trades.length > 1) throw new Error(`Maximum of 1 trade allowed.`);

	delete updates.trades;
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
						id: ctx.request.userId
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

	// Find the creator of the job
	const where = { id: ctx.request.userId };
	const user = await ctx.db.query.user({ where }, `{ id email name }`);

	try {
		// Email job owner that a new job has been created successfully
		const mailToOwner = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: user.email,
			TemplateAlias: "job-created",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/job?id=${job.id}`,
				company_name: "Fill My Diary",
				job_description: updates.description,
				job_title: updates.title,
				product_name: "Fill My Diary",
				product_url: process.env.FRONTEND_URL,
				support_email: process.env.MAIL_ADMIN,
				user_name: user.name,
				help_url: `${process.env.FRONTEND_URL}/help`,
				login_url: `${process.env.FRONTEND_URL}/login`
			}
		});
	} catch (error) {
		console.log(error);
	}

	// LET THE MAGIC HAPPEN
	await allUserNotifications(parent, args, ctx, info, job, updates, trades);

	return job;
};

exports.createJob = createJob;
