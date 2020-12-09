const logoutUser = function(parent, args, ctx, info) {
	ctx.response.clearCookie(`token`);
	return { message: `Goodybe!` };
};

exports.logoutUser = logoutUser;
