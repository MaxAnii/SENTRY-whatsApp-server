// require("dotenv").config();
// const OpenAI = require("openai");
// const prompt = require("../utils/promptTemplate");
// const openai = new OpenAI({
// 	apiKey: process.env.OpenAI,
// });
// const checkMessageToxicity = async (message, toleranceLevel) => {
// 	const completion = await openai.chat.completions.create({
// 		messages: [
// 			{
// 				role: "system",
// 				content: prompt(message),
// 			},
// 		],
// 		model: "gpt-4",
// 		temperature: 0.3,
// 	});

// 	console.log("Message ", completion.choices[0].message.content);
// 	const score = parseInt(
// 		completion.choices[0].message.content.split("@")[1].trim()
// 	);
// 	console.log("SCORE => ", score);

// 	return score >= toleranceLevel;
// };
const axios = require("axios");
const FormData = require("form-data");
const Stream = require("stream");
const fs = require("fs");

const { Readable } = require("stream");

function createReadableStreamFromImageData(imageData) {
	const buffer = Buffer.from(imageData, "base64");

	const readStream = Readable.from(buffer);
	const fileName = "data.jpg";
	const writeStream = fs.createWriteStream(fileName);

	readStream.pipe(writeStream);
	return fileName;
}

const checkMessageToxicity = async (message) => {
	try {
		const data = new FormData();
		data.append("text", message);
		data.append("lang", "en");
		data.append("mode", "ml");
		data.append("api_user", "1467434505");
		data.append("api_secret", "Cy9wZR32unS8EG68CKbD7recXJGEpoHr");
		const responseData = await axios({
			url: "https://api.sightengine.com/1.0/text/check.json",
			method: "post",
			data: data,
			headers: data.getHeaders(),
		});
		console.log(responseData.data);
		return responseData.data.moderation_classes;
	} catch (error) {
		console.log(error.message);
	}
};
const checkMediaToxicity = async (mediaData) => {
	try {
		const data = new FormData();
		const filePath = createReadableStreamFromImageData(mediaData.data);

		data.append("media", fs.createReadStream(filePath));
		data.append("models", "wad,text-content");
		data.append("api_user", "1651200831");
		data.append("api_secret", "iyYM3GePHxhKuf3M3s8DVdeXdftgTban");
		console.log("hi");

		const response = await axios({
			method: "post",
			url: "https://api.sightengine.com/1.0/check.json",
			data: data,
			headers: data.getHeaders(),
		});

		return response.data;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { checkMessageToxicity, checkMediaToxicity };
