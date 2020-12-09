const { TaskTimer } = require("tasktimer");

const checkJobsExpired = function checkJobsExpired(db) {
	const timer = new TaskTimer(1000);

	timer.add([
		{
			id: "checkJob", // unique ID of the task
			tickInterval: 3600, // run every hour (3600 x interval = 3600000 ms)
			totalRuns: 0, // run for unlimited times
			async callback(task) {
				// KEY
				// NA = No Application(s)
				// RA = Recieved Application(s)

				const today = new Date().toISOString();

				/* Query the jobs which have recieved no applications and startDate is less than today */

				const conditionsNA = {
					startDate_lte: today,
					stage: `CREATED`
				};

				const jobsNA = await db.query.jobs({ where: conditionsNA }, `{ id }`);

				if (jobsNA.length !== 0) {
					jobsNA.map(job => {
						jobsRA.map(async job => {
							try {
								const updateExpired = await db.mutation.updateJob({
									data: {
										stage: `EXPIRED`
									},
									where: {
										id: job.id
									}
								});
								console.log(updateExpired);
							} catch (error) {
								console.error(error);
							}
						});
					});
				}

				/* Query the jobs which have recieved applications and startDate is less than today */

				const conditionsRA = {
					startDate_lte: today,
					stage: `RECIEVEDAPPLICATION`
				};

				const jobsRA = await db.query.jobs({ where: conditionsRA }, `{ id }`);

				if (jobsRA.length === 0) return null;

				jobsRA.map(async job => {
					try {
						const updateTheJob = await db.mutation.updateJob({
							data: {
								stage: `OUTSTANDING`
							},
							where: {
								id: job.id
							}
						});
						console.log(updateTheJob);
					} catch (error) {
						console.error(error);
					}
				});
			}
		}
	]);

	// Start the timer
	timer.start();
};

exports.checkJobsExpired = checkJobsExpired;
