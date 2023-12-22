const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//using middleware

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

//importing Routes
const post = require("./routes/post_routes");
const user = require("./routes/user_routes");

//using routes
app.use("/api/v1", post);
app.use("/api/v1",user);

module.exports = app;
