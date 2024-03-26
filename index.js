const express = require("express");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const client = require("./utils/whatsapp-web");
const router = require("./routers/sendOtp");
const db = require("./utils/db");
const groupConfig = require("./controllers/parseMessage");
const parseMessage = require("./controllers/parseMessage");

const corsOptions = {
	origin: "http://localhost:3000",
	methods: "GET,POST",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/", router);
client.on("message", async (msg) => {
	parseMessage(msg);

	// chat.removeParticipants("916006120579");
});
client.initialize();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
