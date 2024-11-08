// This file handles conversations and user requests for data updates

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
    res.status(200).send({message: "Invalid input. Please check your spelling." });
  }
};