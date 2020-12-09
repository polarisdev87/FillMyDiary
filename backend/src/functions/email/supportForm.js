const postmark = require(`postmark`);
const client = new postmark.ServerClient(
	`068100e8-923c-4663-85a5-ee7b5901e562`
);
const { emailAdmin } = require(`../../data`);

const supportForm = async function(args) {
	// Send the administrator an email with contents of senders form
	try {
		const mailAdmin = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: emailAdmin,
			TemplateAlias: "support-form",
			TemplateModel: {
				email_from: args.email,
				email_message: args.message,
				email_subject: args.subject,
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

	// Send the submitter of the contact form a confirmation email with contents sent to administrator
	try {
		const mailSubmitter = await client.sendEmailWithTemplate({
			From: emailAdmin,
			To: args.email,
			TemplateAlias: "support-form-confirmation",
			TemplateModel: {
				email_from: args.email,
				email_message: args.message,
				email_subject: args.subject,
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
};

exports.supportForm = supportForm;
