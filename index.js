const express = require("express");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const client = require("./utils/whatsapp-web");
const router = require("./routers/send-otp");
const corsOptions = {
	origin: "http://localhost:3000",
	methods: "GET,POST",
};

app.use(cors(corsOptions));
client.initialize();

app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
