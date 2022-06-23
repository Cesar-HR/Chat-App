const {
  sendMessage,
  receivedMessage,
} = require("./../controllers/msgController");
const router = require("express").Router();

router.post("/sendMessage", sendMessage);
router.post("/receivedMessage", receivedMessage);

module.exports = router;
