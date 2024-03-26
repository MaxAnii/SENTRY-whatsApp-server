const client = require("../utils/whatsapp-web");
const checkMessageToxicity = require("./checkMessageToxicity");
const getGroupDetails = require("./getGroupDetails");
const getGroupMetaData = require("./getGroupMetaData");
const warnUser = require("./warnUser");

const parseMessage = async (msg) => {
	try {
		const chat = await msg.getChat();
		console.log(msg);
		const { message, sender, groupName, adminList } = await getGroupMetaData(
			msg
		);
		console.log({ message, sender, groupName, adminList });
		// check if user is admin
		// if (adminList.includes(sender.slice(0, 12))) {
		// 	return;
		// }
		const groupConfigDetails = await getGroupDetails(groupName, adminList);

		const isMessageToxic = await checkMessageToxicity(
			message,
			groupConfigDetails[0].toleranceLevel
		);

		if (isMessageToxic) {
			const data = {
				whatsAppid: sender.slice(0, 12),
				groupId: groupConfigDetails[0].id,
				warningPerUser: groupConfigDetails[0].warningPerUser,
			};
			msg.delete(true);
			const removeUser = await warnUser({ ...data });
			if (true) {
				await chat.removeParticipant([msg.from]);
				// remove the user from group
			}
			// client.searchMessages(sender, "this is warning");
		}

		return isMessageToxic;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = parseMessage;
