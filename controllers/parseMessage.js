const {
	checkMessageToxicity,
	checkMediaToxicity,
} = require("./checkMessageToxicity");
const getGroupDetails = require("./getGroupDetails");
const getGroupMetaData = require("./getGroupMetaData");
const performUserAction = require("./performUserAction");
const client = require("../utils/whatsapp-web");

const parseMessage = async (msg) => {
	try {
		const chat = await msg.getChat();
		if (!chat.isGroup) return;
		const { message, sender, groupName, adminList } = await getGroupMetaData(
			msg
		);
		// if (adminList.includes(sender.slice(0, 12))) {
		// 	return;
		// }
		// const groupConfigDetails = await getGroupDetails(groupName, adminList);
		// if (!groupConfigDetails) return;
		const hasMedia = msg.hasMedia;
		if (hasMedia) {
			const mediaData = await msg.downloadMedia();
			console.log(mediaData.mimetype);
			if (mediaData.mimetype === "image/jpeg") {
				let isMessageToxic = await checkMediaToxicity(mediaData);
				const reportMessage = JSON.stringify(isMessageToxic, null, 2);
				// console.log("test", reportMessage);
				chat.sendMessage(reportMessage);
			}
		}
		console.log(message);
		if (message) {
			const isMessageToxic = await checkMessageToxicity(message);
			const reportMessage = JSON.stringify(isMessageToxic, null, 2);
			chat.sendMessage(reportMessage);
		}

		// if (true) {
		// 	msg.delete(true);
		// 	const data = {
		// 		whatsAppid: sender.slice(0, 12),
		// 		groupId: groupConfigDetails[0].id,
		// 		warningPerUser: groupConfigDetails[0].warningPerUser,
		// 	};
		// 	const isWarningCountOver = await performUserAction({ ...data });
		// 	// if (isWarningCountOver ) {
		// 	// 	await chat.removeParticipants([msg.author]);
		// 	// }
		// }
	} catch (error) {
		console.log("error", error.message);
	}
};

module.exports = parseMessage;
