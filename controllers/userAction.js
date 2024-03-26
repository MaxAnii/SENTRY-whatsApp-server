const db = require("../utils/db");

const addUserTodb = async (groupId, whatsAppid) => {
	try {
		const addUser = await db.groupUser.create({
			data: {
				groupId,
				whatsAppid,
				warningCount: "1",
			},
		});
		console.log("adding User");
	} catch (error) {
		console.log(error.message);
	}
};

const getExistingUserDetails = async (groupId, whatsAppid) => {
	try {
		const UserDetails = await db.groupUser.findMany({
			where: {
				groupId,
				whatsAppid,
			},
		});
		console.log("getting User");
		return UserDetails;
	} catch (error) {
		console.log(error.message);
	}
};
const deleteUserFromdb = async (id) => {
	try {
		await db.groupUser.delete({
			where: {
				id,
			},
		});
		console.log("deleting User");
	} catch (error) {
		console.log(error.message);
	}
};
const updateUserDetails = async (id, warningCount) => {
	try {
		await db.groupUser.update({
			where: {
				id,
			},
			data: {
				warningCount,
			},
		});
		console.log("updating User");
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	addUserTodb,
	deleteUserFromdb,
	updateUserDetails,
	getExistingUserDetails,
};
