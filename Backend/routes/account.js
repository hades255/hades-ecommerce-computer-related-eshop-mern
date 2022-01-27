const express = require("express");
const router = express.Router();
const { accountSC } = require("../schema");

router.get("/:email", async (req, res) => {
  try {
    const data = await accountSC.findOne({ email: req.params.email });
    res.json([data]);
  } catch (error) {
    res.json({
      message: "error",
    });
  }
});

router.get("/:email/cart", async (req, res) => {
  try {
    const account = await accountSC.find({ email: req.params.email });
    res.json(account[0].cart);
  } catch (error) {
    res.json(error);
  }
});

router.put("/:email/cart", async (req, res) => {
  try {
    const item = await accountSC.find({
      email: req.params.email,
      cart: { $elemMatch: { id: req.body.id } },
    });
    if (item.length > 0) {
      res.json("exist");
    } else {
      const push = await accountSC.findOneAndUpdate(
        { email: req.params.email },
        { $push: { cart: req.body } }
      );
      res.json("success");
    }
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:email/cart/:id", async (req, res) => {
  try {
    const item = await accountSC.findOneAndUpdate(
      { email: req.params.email },
      { $pull: { cart: { id: parseInt(req.params.id) } } }
    );
    res.json({
      message: "Item deleated",
    });
  } catch (err) {
    res.json({
      message: "err",
    });
  }
});

module.exports = router;
