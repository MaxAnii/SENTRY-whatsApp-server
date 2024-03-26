const getGroupMetaData = async (msg) => {
	const chat = await msg.getChat();
	if (chat.isGroup) {
		const groupMetadata = await chat.groupMetadata;
		const groupName = groupMetadata.subject;
		const adminList = groupMetadata.participants
			.filter((elem) => elem.isAdmin)
			.map((admin) => admin.id.user);

		return {
			message: msg.body,
			sender: msg.author,
			groupName,
			adminList,
		};
	}
};

module.exports = getGroupMetaData;
