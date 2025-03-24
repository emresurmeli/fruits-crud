import { Router } from "express";
import Fruit from "../models/fruit.js";

const fruitsRouter = Router();

fruitsRouter.get("/", (req, res) => {
  res.render("index")
})

// Get the create form
fruitsRouter.get("/fruits/new", (req, res) => {
  res.render("fruits/new");
});

// Get all fruits
fruitsRouter.get("/fruits", async (req, res) => {
  const fruits = await Fruit.find({});
  res.render("fruits/index", { fruits });
});

// Create a fruit
fruitsRouter.post("/fruits", async (req, res) => {
  let { name, isReadyToEat } = req.body;

  if (isReadyToEat) {
    isReadyToEat = true;
  } else {
    isReadyToEat = false;
  }

  const fruit = await Fruit.create({ name, isReadyToEat });

  res.redirect("/fruits");
});

export default fruitsRouter;
