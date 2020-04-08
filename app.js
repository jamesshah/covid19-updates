const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const script = require("./public/script");
const expressLayout = require("express-ejs-layouts");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting EJS as templating engine
app.set("view engine", "ejs");
app.use(expressLayout);

// To connect to MongoDB Database
mongoose.connect(
  process.env.DB_CONN,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to DB!");
  }
);

// To serve Static Files(CSS,imgs,JS)
app.use(express.static("public"));

// To serve views using middlewares
app.use("/users", require("./routes/users"));
app.use("/", require("./routes/index"));
app.use("/sms", require("./routes/sms"));

app.listen(process.env.PORT || 3000, () => {
  // script.get_data();
  // script.get_users();
  script.tasks.start();
  // script.send_msg();
});
