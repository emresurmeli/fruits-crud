import express from "express";
import morgan from "morgan";
import methodOverride from "method-override";
import "./db/connection.js";

import fruitsRouter from "./controllers/fruits.js";

const PORT = process.env.PORT || "3000";
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.set("view engine", "ejs");

// Routes
app.use("/", fruitsRouter);

// Error handler route
app.use("*", (req, res) => {
  res.render("error", { message: "Page doesn't exist" });
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
