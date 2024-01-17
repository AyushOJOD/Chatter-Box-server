const { addMessage, getMessages } = require("../controller/messageController");

const router = require("express").Router();

router.post("/addMessage", addMessage);
router.get("/getMessages", getMessages);

module.exports = router;
