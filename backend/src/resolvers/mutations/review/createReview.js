const createReview = async function(parent, args, ctx, info) {
	if (!ctx.request.userId) throw new Error(`You must be logged in to do that!`);
	if (!args.job) throw new Error(`No job ID provided`);
	var reviewUser;

	// Create a copy of the updates from arguments parameter
	const updates = { ...args };
	delete updates.job;

	// If tradesmen is reviewing
	if (updates.type === `Tradesmen`) {
		// Get the user that created the job
		const [jobOwner] = await ctx.db.query.jobs(
			{
				where: {
					id: args.job
				}
			},
			`{ user { id } }`
		);

		// Asign the user that created the job as the user influenced by review
		reviewUser = jobOwner.user.id;

		// Update the job to be marked as reviewed by the worker (tradesmen)
		const updateJobStatus = ctx.db.mutation.updateJob(
			{
				data: {
					reviewedByWorker: true
				},
				where: {
					id: args.job
				}
			},
			info
		);
	}

	// If tradesmen is reviewing
	if (updates.type === `Builder`) {
		// Get the applicant that completed the job
		const [jobWorker] = await ctx.db.query.applications(
			{
				where: {
					job: {
						id: args.job
					},
					successful: true
				}
			},
			`{ user { id } }`
		);

		// Asign the user that completed the job as the user influenced by review
		reviewUser = jobWorker.user.id;

		// Update the job to be marked as reviewed by the owner of the job
		const updateJobStatus = ctx.db.mutation.updateJob(
			{
				data: {
					reviewedByOwner: true
				},
				where: {
					id: args.job
				}
			},
			info
		);
	}

	// Get the job review status
	const [job] = await ctx.db.query.jobs(
		{
			where: {
				id: args.job
			}
		},
		`{ reviewedByOwner reviewedByWorker }`
	);

	// If both reviewed by owner and worker (tradesmen) then set job to reviewed
	if (job.reviewedByOwner && job.reviewedByWorker) {
		// Set the stage/status of the job to JOBREVIEWED
		const updateJobStatus = ctx.db.mutation.updateJob(
			{
				data: {
					stage: `JOBREVIEWED`
				},
				where: {
					id: args.job
				}
			},
			info
		);
	}

	// Check a review hasn't already been made by the user
	const where = { job: { id: args.job.id } };
	const reviewRes = await ctx.db.query.reviews({ where }, `{ user { id } }`);

	if (typeof reviewRes !== `undefined` && reviewRes.length !== 0) {
		if (reviewRes.some(e => e.user.id === reviewUser)) {
			throw new Error(`A review for that user and that job already exists'`);
		}
	}

	// Create the review
	const review = await ctx.db.mutation.createReview(
		{
			data: {
				// This is how we create a relationship between the job and the review
				job: {
					connect: {
						id: args.job
					}
				},
				// This is how we create a relationship between the user and the review
				user: {
					connect: {
						id: reviewUser ? reviewUser : ctx.request.userId
					}
				},
				...updates
			}
		},
		info
	);

	// Return application object with application ID
	return review;
};

exports.createReview = createReview;
