import mongoose from "mongoose";

const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isReadyToEat: Boolean,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

export default Fruit;
