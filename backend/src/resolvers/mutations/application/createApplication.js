const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);
const stripe = require(`../../../stripe`);

const createApplication = async function(parent, args, ctx, info) {
	if (!ctx.request.userId) {
		throw new Error(`You must be logged in to do that!`);
	}

	// Get the user creating the application
	const user = await ctx.db.query.user({
		where: {
			id: ctx.request.userId
		}
	});

	var customer;

	let existingCustomers = await stripe.customers.list({ email: user.email });
	if (existingCustomers.data.length) {
		// Get existing customer:
		customer = existingCustomers.data[0];
	} else {
		// Create a customer:
		customer = await stripe.customers.create({
			source: args.token,
			email: user.email
		});
	}

	const customerID = customer.id;
	const open = true;
	const successful = false;

	const application = await ctx.db.mutation.createApplication(
		{
			data: {
				// This is how we create a relationship between the application -> user
				user: {
					connect: {
						id: ctx.request.userId
					}
				},
				// This is how we create a relationship between the application -> job
				job: {
					connect: {
						id: args.id
					}
				},
				customerID,
				open,
				successful
			}
		},
		info
	);

	// Create counter variable based on user current count validity
	var newCount;
	user.openApplications === NaN ||
	user.openApplications === null ||
	user.openApplications === 0
		? (newCount = 1)
		: (newCount = user.openApplications + 1);

	// Set the new user applicaiton count to increase by 1
	const updatedUser = await ctx.db.mutation.updateUser({
		where: {
			id: user.id
		},
		data: {
			openApplications: newCount
		}
	});

	// Get the details of the job to use in emails
	const job = await ctx.db.query.job(
		{
			where: {
				id: args.id
			}
		},
		`{ id description title user { id email } }`
	);

	// Set the stage/status of the job to RECIEVEDAPPLICATION
	const updateJobStatus = ctx.db.mutation.updateJob(
		{
			data: {
				stage: `RECIEVEDAPPLICATION`
			},
			where: {
				id: args.id
			}
		},
		info
	);

	try {
		// Notify user application creation
		const mailToJobOwner = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: job.user.email,
			TemplateAlias: "application-notification-owner",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/applications?id=${job.id}`,
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

	try {
		// If the user was successful, send them an email to let them know.
		const mailToApplicant = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: user.email,
			TemplateAlias: "application-notification-applicant",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/user?id=${user.id}`,
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

	// Return application object with application ID
	return application;
};

exports.createApplication = createApplication;
