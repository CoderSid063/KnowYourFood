import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  creator_email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"],
  },
});

// Ensure the model is not re-defined if already defined
let Meal;
try {
  Meal = mongoose.model("meals");
} catch (error) {
  Meal = mongoose.model("meals", MealSchema);
}

export default Meal;
