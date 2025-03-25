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
  try {
    const { id } = req.params;
    const fruit = await Fruit.findById(id);

    res.render("fruits/show", { fruit });
  } catch (error) {
    console.error(error);
    let message = error.message;
    if (message.includes("ObjectId")) {
      message = "This fruit doesn't exist";
    }
    res.render("fruits/error", { message });
  }
});

// Get all fruits
fruitsRouter.get("/fruits", async (req, res) => {
  const fruits = await Fruit.find({});
  res.render("fruits/index", { fruits });
});

// Create a fruit
fruitsRouter.post("/fruits", async (req, res) => {
  try {
    let { name, isReadyToEat } = req.body;

    if (!name) {
      throw new Error("Field 'name' is required");
    }

    if (isReadyToEat) {
      isReadyToEat = true;
    } else {
      isReadyToEat = false;
    }

    const fruit = await Fruit.create({ name, isReadyToEat });

    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
    res.render("fruits/error", { message: error.message })
  }
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
