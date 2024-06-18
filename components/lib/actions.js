"use server";

import { revalidatePath } from "next/cache";
import saveMeal from "./meals";
import { redirect } from "next/navigation";

//this function for validation :-
function isInvalid(text) {
  return !text || text.trim() === "";
}

// this function only execute on server.
export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.instructions) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === "0"
  ) {
    return {
      message: "Invalid Input",
    };
  }
  await saveMeal(meal);

  //"revalidatePath()" use in production to fetch and represnt the latest data in our all pages .
  revalidatePath("/meals");
  redirect("/meals");
}
