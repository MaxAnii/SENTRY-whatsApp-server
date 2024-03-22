const express = require("express");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const client = require("./utils/whatsapp-web");
const router = require("./routers/send-otp");
const db = require("./utils/db");
const corsOptions = {
	origin: "http://localhost:3000",
	methods: "GET,POST",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/", router);
client.on("message", async (msg) => {
	const chat = await msg.getChat();
	const test = {
		Name: chat.name,
		Description: chat.description,
		Created_At: chat.createdAt.toString(),
		Created_By: chat.owner.user,
		participants: chat.participants,
		Participant_count: chat.participants.length,
	};
	console.log(test);
});
client.initialize();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
