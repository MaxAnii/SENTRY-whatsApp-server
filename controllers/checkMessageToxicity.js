require("dotenv").config();
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
		data.append("lang", "en,fr,it,pt,es,ru,tr");
		data.append("mode", "ml");
		data.append("api_user", process.env.api_user);
		data.append("api_secret", process.env.api_secret);
		const responseData = await axios({
			url: "https://api.sightengine.com/1.0/text/check.json",
			method: "post",
			data: data,
			headers: data.getHeaders(),
		});

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
		data.append("models", "nudity-2.0,wad,offensive,text-content,gore");
		data.append("api_user", process.env.api_user);
		data.append("api_secret", process.env.api_secret);

		const response = await axios({
			method: "post",
			url: "https://api.sightengine.com/1.0/check.json",
			data: data,
			headers: data.getHeaders(),
		});

		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { checkMessageToxicity, checkMediaToxicity };
