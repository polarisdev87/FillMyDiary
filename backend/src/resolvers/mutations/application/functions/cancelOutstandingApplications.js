const cancelOutstandingApplications = async function(
	parent,
	args,
	ctx,
	info,
	job,
	user
) {
	// Get the applications open for the job
	const applicationDates = await ctx.db.query.applications(
		{
			where: {
				user: {
					id: args.user
				}
			}
		},
		`{ id job { id endDate startDate title } }`
	);

	const sortedRanges = applicationDates.sort((a, b) => {
		return a.job.startDate < b.job.startDate
			? -1
			: a.job.startDate > b.job.startDate
			? 1
			: 0;
	});

	const result = sortedRanges.reduce(
		(result, current, idx, arr) => {
			if (current.job.id === job.id) return result;

			// check for any overlap
			const overlap =
				current.job.startDate < job.endDate &&
				current.job.endDate > job.startDate;

			// store the result
			if (overlap) {
				// yes, there is overlap
				result.overlap = true;
				// store the specific ranges that overlap
				result.applications.push({ id: current.id });
			}

			return result;

			// seed the reduce
		},
		{ overlap: false, applications: [] }
	);

	if (result.overlap) {
		result.applications.map(app => {
			const where = { id: app.id };

			// Delete the Application
			return ctx.db.mutation.deleteApplication({ where }, info);
		});
	}
};

exports.cancelOutstandingApplications = cancelOutstandingApplications;
