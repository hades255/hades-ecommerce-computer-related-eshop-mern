const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
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
} = require("./schema");
const { hashPassword, checkPassword } = require("./bcrypt");

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

// login endpoint

app.post("/login", async (req, res) => {
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

app.post("/register", async (req, res) => {
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

//catalog endpoint
app.get("/catalog", async (req, res) => {
  try {
    const data = await catalogSC.find();
    res.json([...data]);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

app.post("/catalog", async (req, res) => {
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

//app endpoints

app.post("/catalog/:catalog", async (req, res) => {
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

app.get("/catalog/:catalog", async (req, res) => {
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

app.get("/catalog/:catalog/:id", async (req, res) => {
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

app.put("/catalog/:catalog/:id", async (req, res) => {
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

app.delete("/catalog/:catalog/:id/:mail", async (req, res) => {
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

// account endpoint
app.get("/account/:email", async (req, res) => {
  try {
    const data = await accountSC.findOne({ email: req.params.email });
    res.json([data]);
  } catch (error) {
    res.json({
      message: "error",
    });
  }
});

app.put("/account/:email/cart", async (req, res) => {
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
//port
app.listen(3001, () => console.log("server is running"));
