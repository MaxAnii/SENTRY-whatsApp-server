const checkMessageToxicity = require("./checkMessageToxicity");
const getGroupDetails = require("./getGroupDetails");
const getGroupMetaData = require("./getGroupMetaData");
const performUserAction = require("./performUserAction");

const parseMessage = async (msg) => {
	try {
		const chat = await msg.getChat();
		if (!chat.isGroup) return;
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
			msg.delete(true);
			const data = {
				whatsAppid: sender.slice(0, 12),
				groupId: groupConfigDetails[0].id,
				warningPerUser: groupConfigDetails[0].warningPerUser,
			};
			const isWarningCountOver = await performUserAction({ ...data });
			if (isWarningCountOver && groupConfigDetails[0].removeUser === "1") {
				await chat.removeParticipants([msg.author]);
			}
		}
	} catch (error) {
		console.log("error", error.message);
	}
};

module.exports = parseMessage;
