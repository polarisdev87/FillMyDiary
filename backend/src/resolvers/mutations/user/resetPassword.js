const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);

const resetPassword = async function(parent, args, ctx, info) {
	// 1. Check if passwords match
	if (args.password !== args.confirmPassword) {
		throw new Error(`The passwords do not match`);
	}
	// 2. Check if it's a legit reset token
	// 3. Check if it's expired
	const [user] = await ctx.db.query.users({
		where: {
			resetToken: args.resetToken,
			resetTokenExpiry_gte: Date.now() - 1000 * 60 * 60
		}
	});

	if (!user) {
		throw new Error(`This token is either invalid or expired`);
	}

	// 4. Hash their new password
	const password = await bcrypt.hash(args.password, 10);

	// 5. Save the new password to the user and remove old resetToken fields
	const updatedUser = await ctx.db.mutation.updateUser({
		where: {
			email: user.email
		},
		data: {
			password,
			resetToken: null,
			resetTokenExpiry: null
		}
	});

	// 6. Generate JWT
	const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

	// 7. Set the JWT cookie
	ctx.response.cookie(`token`, token, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 365 // 1 YEAR COOKIE
	});

	// 8. Return the new user
	return updatedUser;
};

exports.resetPassword = resetPassword;
