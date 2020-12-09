const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);
const stripe = require(`../../../stripe`);
const {
	cancelOutstandingApplications
} = require(`./functions/cancelOutstandingApplications`);

const acceptApplication = async function(parent, args, ctx, info) {
	if (!ctx.request.userId) throw new Error(`You must be logged in to do that!`);
	if (!args.id) throw new Error(`No application ID provided`);
	if (!args.job) throw new Error(`No job ID provided`);
	if (!args.user) throw new Error(`No user provided`);

	const application = await ctx.db.query.application(
		{ where: { id: args.id } },
		`{ customerID }`
	);

	// Get the application job details
	const job = await ctx.db.query.job(
		{
			where: {
				id: args.job
			}
		},
		`{ id days description endDate price startDate title }`
	);

	// Get the email address of the successful user
	const user = await ctx.db.query.user(
		{
			where: {
				id: args.user
			}
		},
		`{ id email }`
	);

	await cancelOutstandingApplications(parent, args, ctx, info, job, user);

	const amount = job.price * 10;
	const complete = true;
	const total = amount;

	// Charge the Customer instead of the card:
	const charge = await stripe.charges.create({
		amount,
		currency: `GBP`,
		customer: application.customerID
	});

	const order = await ctx.db.mutation.createOrder(
		{
			data: {
				// This is how we create a relationship between the order -> user
				user: {
					connect: {
						id: args.user
					}
				},
				// This is how we create a relationship between the order -> job
				job: {
					connect: {
						id: args.job
					}
				},
				charge: charge.id,
				complete,
				total
			}
		},
		info
	);

	// Get the applications open for the job
	const currentJobApplications = await ctx.db.query.applications(
		{
			where: {
				job: {
					id: args.job
				}
			}
		},
		`{ id user { id email } }`
	);

	// Apply successful property to true on successful application
	const successfulApplication = await ctx.db.mutation.updateApplication(
		{
			data: {
				successful: true
			},
			where: {
				id: args.id
			}
		},
		info
	);

	// Loop through each application and set the open property to false
	currentJobApplications.map(application => {
		var closeApplications = ctx.db.mutation.updateApplication(
			{
				data: {
					open: false
				},
				where: {
					id: application.id
				}
			},
			info
		);
	});

	// Set the stage/status of the job to ACCEPTEDAPPLICANT
	const updateJobStatus = ctx.db.mutation.updateJob(
		{
			data: {
				stage: `ACCEPTEDAPPLICANT`
			},
			where: {
				id: args.job
			}
		},
		info
	);

	// Loop through each application
	currentJobApplications.map(async application => {
		if (user.email === application.user.email) return null;

		try {
			// If the user was unsuccessful, send them an email to let them know.
			const mailResUnsuccess = await client.sendEmailWithTemplate({
				From: emailAdmin,
				To: application.user.email,
				TemplateAlias: "application-unsuccessful",
				TemplateModel: {
					action_url: `${process.env.FRONTEND_URL}/user?id=${
						application.user.id
					}`,
					company_name: "Fill My Diary",
					job_description: job.description,
					job_title: job.title,
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
	});

	try {
		// If the user was successful, send them an email to let them know.
		const mailResSuccess = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: user.email,
			TemplateAlias: "application-successful",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/application?id=${args.id}`,
				company_name: "Fill My Diary",
				job_description: job.description,
				job_title: job.title,
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
			To: user.email,
			TemplateAlias: "order-complete",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/user/orders?id=${user.id}`,
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

	return successfulApplication;
};

exports.acceptApplication = acceptApplication;
