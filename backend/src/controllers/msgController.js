const message = require("./../model/msgModel");

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;
    const data = await message.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });

    const dataInfo = () => {
      return [
        {
          fromSelf: data.sender.toString() === from, //true or false
          message: data.message.text,
        },
      ];
    };

    const response = dataInfo();

    return res.json({
      status: true,
      message: "Message send successfully.",
      response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.receivedMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const data = await message
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const dataInfo = data.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from, //true or false
        message: msg.message.text,
      };
    });

    res.json({
      status: true,
      message: "Message received successfully.",
      dataInfo,
    });
  } catch (error) {
    next(error);
  }
};
