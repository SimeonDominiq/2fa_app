import express from "express";
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser: any = require("body-parser");
const cors = require('cors')
const cookieParser: any = require("cookie-parser");
const routes: any = require("./routes/index");

const app = express();

//database
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => {
        console.log(err);
    });
mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors())
app.use("/api", routes);


const port = process.env.PORT;
app.get("/", (req: any, res: any): void => {
  res.send("status okay! :)");
});


app.use(cors({ origin: `http://localhost:3000` }))

app.listen(port, (): void => {
  console.log(`running on port ${port}`);
});
