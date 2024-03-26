const router = require("express").Router();
const { sendOtp } = require("../controllers/sendOtp");

router.post("/send-otp", sendOtp);

module.exports = router;
