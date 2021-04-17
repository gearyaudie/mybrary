if (process.env.NODE_ENV !== "production") {
  // To be able to use process.env
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));

// Database //
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("Connected to Mongo"))
  .catch((err) => console.log(err));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
