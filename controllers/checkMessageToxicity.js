require("dotenv").config();
const OpenAI = require("openai");
const prompt = require("../utils/promptTemplate");
const openai = new OpenAI({
	apiKey: process.env.OpenAI,
});
const checkMessageToxicity = async (message, toleranceLevel) => {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: prompt(message),
			},
		],
		model: "gpt-4",
		temperature: 0.3,
	});

	console.log("Message ", completion.choices[0].message.content);
	const score = parseInt(
		completion.choices[0].message.content.split("@")[1].trim()
	);
	console.log("SCORE => ", score);

	return score >= toleranceLevel;
};
module.exports = checkMessageToxicity;
