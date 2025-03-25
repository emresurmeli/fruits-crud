import { Router } from "express";
import Fruit from "../models/fruit.js";

const fruitsRouter = Router();

fruitsRouter.get("/", (req, res) => {
  res.render("index");
});

// Get the create form
fruitsRouter.get("/fruits/new", (req, res) => {
  res.render("fruits/new");
});

// Get the edit form
fruitsRouter.get("/fruits/:id/edit", async (req, res) => {
  const { id } = req.params;
  const fruit = await Fruit.findById(id);

  res.render("fruits/edit", { fruit });
});

fruitsRouter.get("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  const fruit = await Fruit.findById(id);

  res.render("fruits/show", { fruit });
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

fruitsRouter.put("/fruits/:id", async (req, res) => {
  // Grab the id from the params
  const { id } = req.params;
  const updateData = {
    name: req.body.name,
    isReadyToEat: req.body.isReadyToEat,
  };

  if (updateData.isReadyToEat) {
    updateData.isReadyToEat = true;
  } else {
    updateData.isReadyToEat = false;
  }

  // Get the fruit and update it
  await Fruit.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  });
  // redirect to fruit
  res.redirect(`/fruits/${id}`);
});

fruitsRouter.delete("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  await Fruit.findByIdAndDelete(id);

  res.redirect("/fruits");
});

export default fruitsRouter;
