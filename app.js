const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
require("express-async-errors")
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middlewares/NotFound");
const errorMiddleware = require("./middlewares/ErrorHandler");

// app.use(express.static("./public"));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
