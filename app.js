var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();

var indexRouter = require("./routes/index");
const osRouter = require("./routes/os");
const productsRouter = require("./routes/products");
var app = express();
//partie connection sur le DB
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
  console.log("connected to DB");
}).catch((err)=>{
  console.log(err.message)
})
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/os", osRouter);
app.use("/products", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});
const server = http.createServer(app);
server.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT || 5000}`);
});
