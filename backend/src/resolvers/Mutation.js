// APPLICATION MUTATIONS
const {
	acceptApplication
} = require(`./mutations/application/acceptApplication`);
const {
	createApplication
} = require(`./mutations/application/createApplication`);
const {
	deleteApplication
} = require(`./mutations/application/deleteApplication`);

// JOB MUTATIONS
const { createJob } = require(`./mutations/job/createJob`);
const { createJobAdmin } = require(`./mutations/job/createJobAdmin`);
const { deleteJob } = require(`./mutations/job/deleteJob`);
const { outstandingJob } = require(`./mutations/job/outstandingJob`);
const { updateJob } = require(`./mutations/job/updateJob`);

// ORDER MUTATIONS

// REVIEW MUTATIONs
const { createReview } = require(`./mutations/review/createReview`);

// SETTING MUTATIONS
const { updateSetting } = require(`./mutations/setting/updateSetting`);

// USER MUTATIONS
const { approveUser } = require(`./mutations/user/approveUser`);
const { createUser } = require(`./mutations/user/createUser`);
const { deleteUser } = require(`./mutations/user/deleteUser`);
const { loginUser } = require(`./mutations/user/loginUser`);
const { logoutUser } = require(`./mutations/user/logoutUser`);
const { requestReset } = require(`./mutations/user/requestReset`);
const { resetPassword } = require(`./mutations/user/resetPassword`);
const { updatePermissions } = require(`./mutations/user/updatePermissions`);
const { updateUser } = require(`./mutations/user/updateUser`);

const Mutations = {
	// APPLICATION MUTATIONS
	acceptApplication,
	createApplication,
	deleteApplication,

	// JOB MUTATIONS
	createJob,
	createJobAdmin,
	deleteJob,
	outstandingJob,
	updateJob,

	// ORDER MUTATIONS

	// REVIEW MUTATIONS
	createReview,

	// SETTING MUTATIONS
	updateSetting,

	// USER MUTATIONS
	approveUser,
	createUser,
	deleteUser,
	loginUser,
	logoutUser,
	requestReset,
	resetPassword,
	updatePermissions,
	updateUser
};

module.exports = Mutations;
