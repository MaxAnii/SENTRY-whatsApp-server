const prompt = (message) => {
	return `Given below within the backticks is an input from a user. You are to predict the language used.
    Once you've predicted the language. Store it with an identifier called LANG.
    Now, you are to score the toxicity level of the input sentence of LANG based on the semantics on a scale of 1-5 and return the ony the score as integer. 
    Return only the score. No other explanation in the following format
    SCORE => SCORE
        \`${message}\`
    `;
};

module.exports = prompt;
