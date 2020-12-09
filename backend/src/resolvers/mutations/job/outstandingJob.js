const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);
const stripe = require(`../../../stripe`);

const outstandingJob = async function(parent, args, ctx, info) {
	if (!ctx.request.userId) throw new Error(`You must be logged in to do that!`);
	if (!args.id) throw new Error(`No job ID provided`);

	const where = {
		id: args.id
	};

	// FIND JOB
	const job = await ctx.db.query.job(
		{
			where
		},
		`{ id description price title user { id email } }`
	);

	// CHECK IF THEY OWN JOB
	const ownsJob = job.user.id === ctx.request.userId;

	const hasPermissions = ctx.request.user.permissions.some(permission =>
		[`ADMIN`, `ITEMDELETE`].includes(permission)
	);

	if (!ownsJob) {
		if (!hasPermissions)
			throw new Error(`You don't have permission to do that`);
	}

	const amount = job.price * 10;
	const complete = true;
	const total = amount;

	console.log({ amount });
	console.log({ args });

	// Charge the Customer's card:
	const charge = await stripe.charges.create({
		amount: amount,
		currency: `GBP`,
		description: `Payment for ${job.title}`,
		source: args.token
	});

	const order = await ctx.db.mutation.createOrder(
		{
			data: {
				// This is how we create a relationship between the order -> user
				user: {
					connect: {
						id: job.user.id
					}
				},
				// This is how we create a relationship between the order -> job
				job: {
					connect: {
						id: job.id
					}
				},
				charge: charge.id,
				complete,
				total
			}
		},
		info
	);

	// Set the stage/status of the job to EXPIRED
	const updateJobStatus = ctx.db.mutation.updateJob(
		{
			data: {
				stage: `EXPIRED`
			},
			where
		},
		info
	);

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "GBP",
		minimumFractionDigits: 2
	});

	const cost = formatter.format(amount / 100);

	try {
		// Email user with confirmation of order
		const mailResSuccessOrder = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: job.user.email,
			TemplateAlias: "order-complete",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/user/orders?id=${job.user.id}`,
				company_name: "Fill My Diary",
				job_description: job.description,
				job_title: job.title,
				order_amount: cost,
				order_id: charge.id,
				product_name: "Fill My Diary",
				product_url: process.env.FRONTEND_URL,
				support_email: process.env.MAIL_ADMIN,
				help_url: `${process.env.FRONTEND_URL}/help`,
				login_url: `${process.env.FRONTEND_URL}/login`
			}
		});
	} catch (error) {
		console.log(error);
	}

	return updateJobStatus;
};

exports.outstandingJob = outstandingJob;
