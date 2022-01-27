const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const mainRoute = require("./routes/main");
const catalogRoute = require("./routes/catalog");
const accountRoute = require("./routes/account");

let dburl =
  "mongodb+srv://<username>:<password>@vimalcluster.afqw9.mongodb.net/CJstores?retryWrites=true&w=majority";

//middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
mongoose.connect(dburl);

//routes
app.use("/", mainRoute);
app.use("/catalog", catalogRoute);
app.use("/account", accountRoute);

//port
app.listen(3001, () => console.log("server is running"));
