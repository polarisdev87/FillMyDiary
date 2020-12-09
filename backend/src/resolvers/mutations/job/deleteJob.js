const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);

const deleteJob = async function(parent, args, ctx, info) {
	const where = { id: args.id };

	// FIND JOB
	const job = await ctx.db.query.job(
		{ where },
		`{ id description title user { id } }`
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

	// Find the creator of the job
	const user = await ctx.db.query.user(
		{
			where: {
				id: job.user.id
			}
		},
		`{ id email name }`
	);

	if (ownsJob) {
		try {
			// Email Job Owner of closed job
			const mailToOwner = await client.sendEmailWithTemplate({
				From: emailAdmin,
				To: user.email,
				TemplateAlias: "job-deleted",
				TemplateModel: {
					action_url: `${process.env.FRONTEND_URL}/user?id=${user.id}`,
					company_name: "Fill My Diary",
					job_description: job.description,
					job_title: job.title,
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
	}

	// DELETE JOB
	return ctx.db.mutation.deleteJob({ where }, info);
};

exports.deleteJob = deleteJob;
