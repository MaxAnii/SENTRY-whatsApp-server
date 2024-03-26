const db = require("../utils/db");
const getGroupDetails = async (groupName, adminNumbers) => {
	try {
		const data = await db.group.findMany({
			where: { groupName },
		});
		const groupDetails = data.filter((elem) => {
			const phoneNumber = "91" + elem.adminPhoneNumber.slice(-10);
			return adminNumbers.includes(phoneNumber);
		});
		return groupDetails;
	} catch (error) {
		console.log(error.message);
	}
};
module.exports = getGroupDetails;
