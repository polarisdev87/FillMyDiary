const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);

const loginUser = async function(parent, { email, password }, ctx, info) {
	// 1. CHECK IF USER EXISTS WITH EMAIL
	const user = await ctx.db.query.user({ where: { email: email } });
	if (!user) {
		throw new Error(`No such user found for email ${email}`);
	}

	// 2. CHECK IF PASS IS CORRECT
	const valid = await bcrypt.compare(password, user.password);
	if (!valid) {
		throw new Error(`Invalid Password!`);
	}

	// 3. GENERATE JWT TOKEN
	const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

	// 4. SET THE COOKIE WITH THE TOKEN
	ctx.response.cookie(`token`, token, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 365 // 1 YEAR COOKIE
	});
	// 5. RETURN THE USER
	console.log(ctx.response.cookie);

	return user;
};

exports.loginUser = loginUser;
