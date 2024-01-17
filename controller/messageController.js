const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ message: "Message added to database", status: true });
    } else {
      return res.json({ message: "Message failed ", status: false });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.query;

    const messages = await messageModel
      .find({
        users: { $all: [from, to] },
      })
      .sort({ updatedAt: 1 });

    const projectMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        messages: message.message.text,
      };
    });

    res.json(projectMessages);
  } catch (error) {
    next(error);
  }
};
