const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const {
  gpuSC,
  processorSC,
  cabinetSC,
  storageSC,
  ramSC,
  mouseSC,
  keyboardSC,
  monitorSC,
} = require("./schema");

let dburl =
  "mongodb+srv://<username>:<password>@vimalcluster.afqw9.mongodb.net/CJstores?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors({ origin: "*" }));
mongoose.connect(dburl);

//function
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

//home endpoint

app.get("/", async (req, res) => {
  try {
    const gpu = await gpuSC.find();
    const processor = await processorSC.find();
    const cabinet = await cabinetSC.find();
    const ram = await ramSC.find();
    const mouse = await mouseSC.find();
    const monitor = await monitorSC.find();

    let data = {
      deals: [gpu[0], processor[0], monitor[0]],
      new: [cabinet[0], ram[0], mouse[0]],
    };

    res.json([data]);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

//app endpoints

app.post("/:catalog", async (req, res) => {
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

app.get("/:catalog", async (req, res) => {
  try {
    let catalog = req.params.catalog;

    const data = await findModel(catalog).find();
    res.json({
      data: data,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

app.get("/:catalog/:id", async (req, res) => {
  try {
    let catalog = req.params.catalog;

    const item = await findModel(catalog).find({ id: req.params.id });
    if (item.length > 0) {
      res.json({
        message: item,
      });
    } else {
      res.json({
        message: "Item not found",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

app.put("/:catalog/:id", async (req, res) => {
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

app.delete("/:catalog/:id/:mail", async (req, res) => {
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

//port
app.listen(3001, () => console.log("server is running"));
