const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const MONGO_URL = require("./config");
const { authRouter } = require("./routes/authRoutes");
const { urlRouter } = require("./routes/urlRoutes");

const app = express();
app.use(express.json());
app.use(cors());


app.use("/user", authRouter );
app.use("/", urlRouter );

async function main() {
    await mongoose.connect(MONGO_URL.MONGO_URL);
    app.listen(3001);
}

main();