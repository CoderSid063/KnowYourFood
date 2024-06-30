import { connect } from "@/dbConfig/dbConfig";
import Meal from "@/models/mealModel";

export default async function saveMeal(meal) {
  console.log("the meal from sharemeal :", meal);

  try {
    const apiUrl = `${process.env.DOMAIN}/meals/share`;

    //use this below apiUrl whren u run in your local machine.
    //const apiUrl = process.env.DOMAIN || "http://localhost:3000";

    const response = await fetch("/api/meals/share", {
      method: "POST",
      // body: formData,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData);
      throw new Error(
        "Saving meal failed: " + errorData.error || response.statusText
      );
    }

    const data = await response.json();
    // console.log("Response data:", data);

    return data;
  } catch (error) {
    console.error("Error saving meal:", error);
    throw new Error(
      "Saving meal failed: " + (error.message || "Unknown error")
    );
  }
}

export async function getMeal(mealSlug) {
  await connect(); // Ensure the database is connected

  try {
    console.log("Connecting to the database...");
    const meal = await Meal.findOne({ slug: mealSlug }).lean();
    // console.log("meal from Db:", meal);

    return meal;
  } catch (error) {}
}
