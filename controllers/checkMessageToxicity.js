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
		model: "gpt-3.5-turbo",
	});
	const score = completion.choices[0].message.content.slice(-1);
	console.log("chatgpt score__", score);
	return score >= toleranceLevel;
};

module.exports = checkMessageToxicity;
