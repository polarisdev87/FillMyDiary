const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	},
	pool: true,
	rateLimit: true,
	maxConnections: 1,
	maxMessages: 3
});

exports.transport = transport;
