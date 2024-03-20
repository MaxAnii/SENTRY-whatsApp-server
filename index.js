const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const qrcode = require("qrcode-terminal");

const client = new Client({
	authStrategy: new LocalAuth(),
});

client.on("ready", () => {
	console.log("Client is ready!");
});

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.initialize();

app.use(bodyParser.json());

app.post("/send-message", (req, res) => {
	// const { recipient, message } = req.body;
	client
		.sendMessage("916006120579@c.us", "test")
		.then(() => {
			res.status(200).send("Message sent successfully");
		})
		.catch((error) => {
			res.status(500).send("Failed to send message: " + error);
		});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
