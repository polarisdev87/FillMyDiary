const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);

const deleteApplication = async function(parent, args, ctx, info) {
	if (!ctx.request.userId) {
		throw new Error(`You must be logged in to do that!`);
	}

	const where = { id: args.id };

	// Find the Application
	const application = await ctx.db.query.application(
		{ where },
		`{ id job { id } user { id email } }`
	);

	// Check if the user owns Application
	const ownsApplication = application.user.id === ctx.request.userId;

	const hasPermissions = ctx.request.user.permissions.some(permission =>
		[`ADMIN`, `ITEMDELETE`].includes(permission)
	);

	if (!ownsApplication) {
		if (!hasPermissions)
			throw new Error(`You don't have permission to do that`);
	}

	// Get the job details of the application
	const job = await ctx.db.query.job(
		{
			where: {
				id: application.job.id
			}
		},
		`{ id description title applications { id } }`
	);

	// If this is the only application available for the job then update the job status
	if (job.applications.length === 1) {
		// Set the stage/status of the job to CREATED
		const updateJobStatus = ctx.db.mutation.updateJob(
			{
				data: {
					stage: `CREATED`
				},
				where: {
					id: application.job.id
				}
			},
			info
		);
	}

	try {
		// Email user to notify that application has been deleted
		const mailToApplicant = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: application.user.email,
			TemplateAlias: "application-deleted",
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

	// Delete the Application
	return ctx.db.mutation.deleteApplication({ where }, info);
};

exports.deleteApplication = deleteApplication;
