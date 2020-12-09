function hasPermission(user, permissionsNeeded) {
	const matchedPermissions = user.permissions.filter(permissionTheyHave =>
		permissionsNeeded.includes(permissionTheyHave)
	);
	if (!matchedPermissions.length) {
		throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
	}
}

function duplicateArrayValues(array) {
	const results = array.reduce(function(acc, el, i, arr) {
		if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
		return acc;
	}, []);
	return results.length > 0;
}

exports.duplicateArrayValues = duplicateArrayValues;
exports.hasPermission = hasPermission;
