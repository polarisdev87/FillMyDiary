const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);

const deleteUser = async function(parent, args, ctx, info) {
	// Get the ID of the user to be deleted
	const where = { id: args.id };

	// Find the user in the database to be deleted
	const user = await ctx.db.query.user({ where });

	// Check if the user deleting the user is an administrator
	const hasPermissions = ctx.request.user.permissions.some(permission =>
		[`ADMIN`].includes(permission)
	);

	// If the user is not an administrator, they will get an error
	if (!hasPermissions) throw new Error(`You don't have permission to do that`);

	try {
		// Send an email to the user to notify them their account has been deleted
		const emailUser = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: user.email,
			TemplateAlias: "user-delete",
			TemplateModel: {
				action_url: process.env.FRONTEND_URL,
				company_name: "Fill My Diary",
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

	// Delete the user
	return ctx.db.mutation.deleteUser({ where }, info);
};

exports.deleteUser = deleteUser;
