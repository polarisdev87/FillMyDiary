/* PACKAGES */
require("dotenv").config({ path: ".env" });
const cookieParser = require("cookie-parser");
const createServer = require("./createServer");
const stripe = require("./stripe");
const db = require("./db");
const jwt = require("jsonwebtoken");
const { hasPermission } = require("./utils");
const Sentry = require("@sentry/node");
const express = require("express");

/* SETUP */
const server = createServer();
const app = server.express;

/* CUSTOM FUNCTIONS */
const { checkJobsExpired } = require("./functions/checkJobsExpired");
const { supportForm } = require("./functions/email/supportForm");

/* ERROR HANDLING */
Sentry.init({
	dsn: "https://22c43e6df4654a6f9bbda5934e93f404@sentry.io/1412014"
});

checkJobsExpired(db);

// Read Cookies 🍪
app.use(cookieParser());
// Support JSON encoded bodies
app.use(express.json());

server.post("/api/v1/public/send-email", async (req, res) => {
	try {
		await supportForm(req.body);
	} catch (err) {
		res.json({ error: err.message || err.toString() });
	}
});

// Decode the JWT so we can get the user ID on each request
app.use((req, res, next) => {
	const { token } = req.cookies;

	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET);
		// Put the user ID onto the request for future requests to access
		req.userId = userId;
	}

	next();
});

// Use express middleware to populate current user
app.use(async (req, res, next) => {
	if (!req.userId) return next();

	const user = await db.query.user(
		{ where: { id: req.userId } },
		"{id, permissions, email, name}"
	);
	req.user = user;

	next();
});

server
	.start(
		{
			cors: {
				credentials: true,
				origin: [process.env.FRONTEND_URL]
			}
		},
		deets => {
			console.log(
				`Server is now running on port http://localhost:${deets.port}`
			);
		}
	)
	.catch(err => console.log("ERROR:", err));
