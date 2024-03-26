const db = require("../utils/db");
const client = require("../utils/whatsapp-web");
const { sendLastMessage, sendMessage } = require("./sendWarningMessage");
const {
	getExistingUserDetails,
	deleteUserFromdb,
	updateUserDetails,
	addUserTodb,
} = require("./userAction");

const warnUser = async (data) => {
	try {
		const { whatsAppid, groupId, warningPerUser } = { ...data };
		const UserDetails = await getExistingUserDetails(groupId, whatsAppid);
		if (UserDetails.length !== 0) {
			if (UserDetails[0].warningCount === warningPerUser) {
				await deleteUserFromdb(UserDetails[0].id);
				await sendLastMessage(whatsAppid);
				return true;
			}
			const currentWarningCount = (
				parseInt(UserDetails[0].warningCount) + 1
			).toString();
			await updateUserDetails(UserDetails[0].id, currentWarningCount);
		} else {
			await addUserTodb(groupId, whatsAppid);
		}
		await sendMessage(whatsAppid);
		return false;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = warnUser;
