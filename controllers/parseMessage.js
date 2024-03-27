const checkMessageToxicity = require("./checkMessageToxicity");
const getGroupDetails = require("./getGroupDetails");
const getGroupMetaData = require("./getGroupMetaData");
const performUserAction = require("./performUserAction");

const parseMessage = async (msg) => {
	try {
		const chat = await msg.getChat();
		const { message, sender, groupName, adminList } = await getGroupMetaData(
			msg
		);
		if (adminList.includes(sender.slice(0, 12))) {
			return;
		}
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
			const removeUser = await performUserAction({ ...data });
			if (removeUser && getGroupDetails[0].removeUser === "1") {
				await chat.removeParticipants([msg.author]);
			}
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = parseMessage;
