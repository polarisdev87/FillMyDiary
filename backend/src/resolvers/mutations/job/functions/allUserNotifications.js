const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../../../data`);
const { distanceInMiles } = require(`../../../../functions/distanceInMiles`);

const emailUserWithJobDetails = async function(user, job, updates) {
	try {
		// Email job owner that a new job has been created successfully
		const mailToOwner = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: user.email,
			TemplateAlias: "job-available",
			TemplateModel: {
				action_url: `${process.env.FRONTEND_URL}/job?id=${job.id}`,
				company_name: "Fill My Diary",
				job_description: updates.description,
				job_title: updates.title,
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
};

const allUserNotifications = async function(
	parent,
	args,
	ctx,
	info,
	job,
	updates,
	jobTrades
) {
	if (updates.latitude && updates.longitude) {
		const users = await ctx.db.query.users(
			{},
			`{ id email jobNotifications latitude longitude trades { id } }`
		);

		users.map(user => {
			if (
				user.jobNotifications &&
				user.latitude &&
				user.longitude &&
				user.trades &&
				user.trades.some(trade => trade.id === jobTrades.toString())
			) {
				const milesApart = distanceInMiles(
					user.latitude,
					user.longitude,
					updates.latitude,
					updates.longitude
				);

				if (milesApart < user.jobNotifications) {
					emailUserWithJobDetails(user, job, updates);
				}
			}
		});
	}
};

exports.allUserNotifications = allUserNotifications;
