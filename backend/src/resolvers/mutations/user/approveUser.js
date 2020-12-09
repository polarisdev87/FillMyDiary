const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);

const approveUser = async function(parent, args, ctx, info) {
	// Check if they are logged in
	if (!ctx.request.userId) {
		throw new Error(`You must be logged in!`);
	}

	const hasPermissions = ctx.request.user.permissions.some(permission =>
		[`ADMIN`].includes(permission)
	);

	if (!hasPermissions) throw new Error(`You don't have permission to do that`);

	// Query the currents user
	const approvedUser = await ctx.db.query.user(
		{
			where: { id: args.userId }
		},
		info
	);

	try {
		// Notify user application creation
		const mailRes = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: approvedUser.email,
			TemplateAlias: "user-approved",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/user?id=${approvedUser.id}`,
				user_name: approvedUser.name,
				user_email: approvedUser.email.toLowerCase(),
				company_name: "Fill My Diary",
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

	// Update the approval status
	return ctx.db.mutation.updateUser(
		{
			data: {
				approved: true
			},
			where: {
				id: args.userId
			}
		},
		info
	);
};

exports.approveUser = approveUser;
