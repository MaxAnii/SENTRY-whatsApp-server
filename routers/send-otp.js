const router = require("express").Router();
const { sendOtp } = require("../controllers/send-otp");

router.post("/send-otp", sendOtp);

module.exports = router;
