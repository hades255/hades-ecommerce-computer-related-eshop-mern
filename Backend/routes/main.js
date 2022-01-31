const express = require("express");
const { hashPassword, checkPassword } = require("../bcrypt");
const router = express.Router();
const shortid = require("shortid");
const Razorpay = require("razorpay");

const {
  accountSC,
  catalogSC,
  gpuSC,
  processorSC,
  cabinetSC,
  storageSC,
  ramSC,
  mouseSC,
  keyboardSC,
  monitorSC,
} = require("../schema");

const razorpay = new Razorpay({
  key_id: "API KEY",
  key_secret: "API SECRET",
});

router.get("/", async (req, res) => {
  try {
    const gpu = await gpuSC.find();
    const processor = await processorSC.find();
    const cabinet = await cabinetSC.find();
    const ram = await ramSC.find();
    const mouse = await mouseSC.find();
    const monitor = await monitorSC.find();
    const keyboard = await keyboardSC.find();

    let data = {
      deals: [
        { gpu: gpu[0] },
        { processor: processor[0] },
        { monitor: monitor[0] },
        { keyboard: keyboard[0] },
      ],
      new: [
        { cabinet: cabinet[0] },
        { ram: ram[0] },
        { mouse: mouse[0] },
        { processor: processor[1] },
      ],
    };

    res.json([data]);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await accountSC.findOne({ email: req.body.email });
    if (user) {
      try {
        let result = await checkPassword(user.password, req.body.password);
        if (result) {
          res.send("success");
        } else {
          res.send("pwdError");
        }
      } catch (err) {
        res.send("pwdError");
      }
    } else {
      res.send("emailError");
    }
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    let user = await accountSC.findOne({ email: req.body.email });
    if (user) {
      res.send("exist");
    } else {
      let password = await hashPassword(req.body.password);
      req.body.password = password;
      let record = await accountSC.create(req.body);
      res.send("success");
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/razorpay", async (req, res) => {
  const amount = req.body.amount;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
