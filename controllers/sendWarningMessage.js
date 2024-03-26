const client = require("../utils/whatsapp-web");

const sendMessage = async (user) => {
	console.log("sending message", user);
	const userPhoneNumber = user + "@c.us";
	await client.sendMessage(userPhoneNumber, "this is your warning message");
};
const sendLastMessage = async (user) => {
	const userPhoneNumber = user + "@c.us";
	await client.sendMessage(userPhoneNumber, "your are removed from the group");
};

module.exports = { sendMessage, sendLastMessage };
