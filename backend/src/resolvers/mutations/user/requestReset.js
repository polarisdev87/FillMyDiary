const { randomBytes } = require(`crypto`);
const { promisify } = require(`util`);
const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);

const requestReset = async function(parent, args, ctx, info) {
	// 1. Check if this is a real user
	const user = await ctx.db.query.user({ where: { email: args.email } });
	if (!user) {
		throw new Error(`No such user found for email ${args.email}`);
	}

	// 2. Set a reset token and expiry on that user
	const randomBytesPromisified = promisify(randomBytes);
	const resetToken = (await randomBytesPromisified(20)).toString(`hex`);
	const resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour from now
	const res = await ctx.db.mutation.updateUser({
		where: { email: args.email },
		data: { resetToken, resetTokenExpiry }
	});

	try {
		// 3. Email them that reset token
		const mailRes = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: user.email,
			TemplateAlias: "user-password-reset",
			TemplateModel: {
				action_url: `${
					process.env.FRONTEND_URL
				}/user/reset-password?resetToken=${resetToken}`,
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

	// 4. Return the message
	return { message: `Thanks` };
};

exports.requestReset = requestReset;
