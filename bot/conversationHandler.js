// This file handles conversations and user requests for data updates

const generatePersonalizedInsights = userInput => {
  // Provides personalized usage insights based on user status
  const insights = { };
  if (userInput.includes("progress")) {
    insights.progress = "Yes, you are doing well!";
  } else if (userInput.includes("goal")) {
    insights.goal = "Stay focused and you'll uplend your set goals!";
  } else {
    insights.default = "If you need help, please check your profile or say 'hello'!";
  }
  return insights;
};

export const processUserMessage = (req, res) => {
  const message = req.body.message;
  // Analyze user input to checkif user wants to update their profile
  if (message.includes("goal")) {
    // Updates goals
    resp.status(200).send({ message: "Goal updated!" });
  } else if (message.includes("progress")) {
    // Records progress
    resp.status(200).send({ message: "Progress updated!" });
  } else {
    // If message is not recognized, return a default message
    const insights = generatePersonalizedInsights(message);
    res.status(200).send(insights);
  }
};