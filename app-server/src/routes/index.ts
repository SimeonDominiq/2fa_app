const express: any = require("express");
const router: any = express.Router();

/**
 * login route
 */
const { generate, verifyotp, resendotp } = require("../controller/authentication");

router.post("/authenticate", generate);
router.post("/verify", verifyotp);
router.patch("/resend", resendotp);


module.exports = router;
