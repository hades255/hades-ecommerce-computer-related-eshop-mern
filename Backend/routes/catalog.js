const express = require("express");
const router = express.Router();
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

const findModel = (catalog) => {
  let model;
  switch (catalog) {
    case "gpu":
      model = gpuSC;
      break;
    case "processor":
      model = processorSC;
      break;
    case "cabinet":
      model = cabinetSC;
      break;
    case "storage":
      model = storageSC;
      break;
    case "ram":
      model = ramSC;
      break;
    case "mouse":
      model = mouseSC;
      break;
    case "keyboard":
      model = keyboardSC;
      break;
    case "monitor":
      model = monitorSC;
      break;
  }

  return model;
};

router.get("/", async (req, res) => {
  try {
    const data = await catalogSC.find();
    res.json([...data]);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const cata = await catalogSC.create(req.body);
    res.json({
      message: "Data Inserted",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.post("/:catalog", async (req, res) => {
  try {
    let catalog = req.params.catalog;
    const gpu = await findModel(catalog).create(req.body);
    res.json({
      message: "Data Inserted",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/:catalog", async (req, res) => {
  try {
    let catalog = req.params.catalog;
    const data = await findModel(catalog).find();
    res.json(data);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/:catalog/:id", async (req, res) => {
  try {
    let catalog = req.params.catalog;
    const item = await findModel(catalog).find({ id: req.params.id });
    if (item.length > 0) {
      res.json(item);
    } else {
      res.json({
        message: "Item not found",
      });
    }
  } catch (error) {
    res.json({
      message: "error",
    });
  }
});

router.put("/:catalog/:id", async (req, res) => {
  try {
    let catalog = req.params.catalog;
    const item = await findModel(catalog).findOneAndUpdate(
      { id: req.params.id },
      { $push: { comments: req.body } }
    );
    res.json({
      message: "comments updated",
    });
  } catch (err) {
    res.json({
      message: "err",
    });
  }
});

router.delete("/:catalog/:id/:mail", async (req, res) => {
  try {
    let catalog = req.params.catalog;
    let email = req.params.mail;
    const item = await findModel(catalog).findOneAndUpdate(
      { id: req.params.id },
      { $pull: { comments: { mail: email } } }
    );
    res.json({
      message: "comments deleated",
    });
  } catch (err) {
    res.json({
      message: "err",
    });
  }
});

module.exports = router;
