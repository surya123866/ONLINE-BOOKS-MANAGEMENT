require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./logger");
const { books } = require("./booksData");
// const functions = require("firebase-functions");


const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

// HTTP request logger middleware using morgan
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

connectDB();

app.use("/api/admin", require("./routes/admin"));
app.use("/api/books", require("./routes/books"));
app.use("/api/users", require("./routes/users"));
app.use("/api/transactions", require("./routes/transactions"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
// exports.app = functions.https.onRequest(app);

