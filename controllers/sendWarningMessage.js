const client = require("../utils/whatsapp-web");

const sendMessage = async (user) => {
	console.log("sending message", user);
	const userPhoneNumber = user + "@c.us";
	await client.sendMessage(
		userPhoneNumber,
		"Your recent actions violate our group's policies. Please refrain from such behavior to maintain a respectful environment. Further violations may lead to removal from the group."
	);
};
const sendLastMessage = async (user) => {
	const userPhoneNumber = user + "@c.us";
	await client.sendMessage(
		userPhoneNumber,
		"We regret to inform you that due to repeated violations of our group policies, you have been removed from the group. We value respectful conduct among members, and unfortunately, your actions did not align with our community standards."
	);
};

module.exports = { sendMessage, sendLastMessage };
