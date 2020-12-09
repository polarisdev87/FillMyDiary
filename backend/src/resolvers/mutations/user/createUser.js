const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const postmark = require(`postmark`);
const stripe = require(`../../../stripe`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../data`);
const { duplicateArrayValues } = require(`../../../utils`);

const createUser = async function(parent, args, ctx, info) {
	if (
		args.manualReferences &&
		duplicateArrayValues([
			args.manualReferenceOne,
			args.manualReferenceTwo,
			args.manualReferenceThree
		])
	) {
		throw new Error(`You cannot add duplicate manual references`);
	}

	// LOWERCASE THEIR EMAIL
	args.email = args.email.toLowerCase();

	// HASH THE PASSWORD
	const password = await bcrypt.hash(args.password, 10);

	// Always set the user to unapproved on register
	const approved = false;
	const outstandingPayment = false;

	// Create a copy of the updates from arguments parameter
	const updates = { ...args };

	// Process user's trades information
	const trades = updates.trades;
	if (trades === undefined || trades.length == 0) {
		throw new Error(`Please select at least 1 trade for your account.`);
	}

	delete updates.trades;

	// Map Trades to an array which can be used in data connection (Many to One relationsip between trades to user)
	const newTrades = trades.map(trade => ({ id: trade }));

	// Create the user
	const user = await ctx.db.mutation.createUser(
		{
			data: {
				trades: {
					connect: newTrades
				},
				...updates,
				approved,
				outstandingPayment,
				password,
				permissions: { set: [`USER`] }
			}
		},
		info
	);

	// If a manually referenced user, charge the user £25
	if (args.manualReferences) {
		const registrationFee = 2500;

		const charge = await stripe.charges.create({
			amount: registrationFee,
			currency: `GBP`,
			description: `User registration fee for: ${args.email}`,
			source: args.token
		});
	}

	try {
		// Send email to user registering to the site
		const emailUser = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: args.email,
			TemplateAlias: "user-welcome",
			TemplateModel: {
				action_url: process.env.FRONTEND_URL,
				user_name: args.name,
				user_email: args.email.toLowerCase(),
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

	try {
		// Send email to the administrative email account of notification to new user
		const mailRes = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: emailAdmin,
			TemplateAlias: "user-queue-notification",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/admin-manager/queue`,
				user_email: args.email.toLowerCase(),
				user_name: args.name,
				user_postcode: args.postcode,
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

	// CREATE JWT TOKEN
	const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

	// SET JWT AS A COOKIE ON THE RESPONSE
	ctx.response.cookie(`token`, token, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 365 // 1 YEAR COOKIE
	});

	// RETURN USER TO BROWSER
	return user;
};

exports.createUser = createUser;
