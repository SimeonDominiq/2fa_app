const Authenticator = require("../model/authenticator");

exports.generate = async (req: any, res: any) => {
  const { phone: string } = req.body;

  await Authenticator.findOne({ phone: string }).exec(async (err: Error, data) => {
    // let createdAt = data.createdAt
    // let now = new Date(Date.now());
    // let diff = (now.getTime() - createdAt.getTime())/1000;
    // return console.log(diff);
    // return
    if (data) {
      return res.status(400).json({
        error: "Phone number is taken",
      });
    }
    const otp: number = Math.floor(Math.random() * 1000000 + 1);
    const result = new Authenticator({ phone: string, otp });

   await result.save((err, result) => {
      if (err) {
        console.log("RESULT SAVE ERROR ERROR", err);
        return res.status(401).json({
          error: "Error saving in database",
        });
      }
      return res.json({
        status: "Success",
        result,
      });
    });
  });
};

exports.verifyotp = async (req: any, res: any) => {
  const { phone, otp } = req.body;
  await Authenticator.findOne({ phone, otp }).exec((err, data) => {
    
    if (err || !data) {
      return res.status(400).json({
        error: true,
        message: "OTP does not match",
      });
    }
    return res.json({
      error: false,
      status: "Success",
      data,
    });
  });
};

exports.resendotp = async (req: any, res: any) => {
  const { phone } = req.body;
  await Authenticator.findOne({ phone }).exec(async (err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: true,
        message: "Phone number does not match",
      });
    }
    data.otp = Math.floor(Math.random() * 1000000 + 1);
   await data.save((err, result) => {
      if (err) {
        console.log("RESULT SAVE ERROR ERROR", err);
        return res.status(401).json({
          error: "Error saving in database",
        });
      }
      return res.json({
        error: false,
        status: "Success",
        result,
      });
    })
  });
};
