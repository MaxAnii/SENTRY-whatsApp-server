const client = require("../utils/whatsapp-web");
const sendOtp = async (req, res) => {
	try {
		const { recipient, OTP } = req.body;
		const message = `your OTP is ${OTP}`;
		client
			.sendMessage(recipient, message)
			.then(() => {
				res.status(200).send("Message sent successfully");
			})
			.catch((error) => {
				res.status(500).send("Failed to send message: " + error);
			});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { sendOtp };
