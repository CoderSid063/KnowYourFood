"use server";

import saveMeal from "./meals";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "./cloudinary";

// Utility function to check for invalid input
function isInvalid(value) {
  return !value || value.trim().length === 0;
}

// Function to upload an image file to Cloudinary
const uploadToCloudinary = (imageFile) => {
  return new Promise(async (resolve, reject) => {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "meals", // Specify the folder in Cloudinary
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(new Error("Image upload failed: " + error.message));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
};

export async function shareMeal(formData) {
  // Construct a meal object from the form data
  const meal = {
    title: formData.get("title"),
    slug: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  const imageFile = formData.get("image");
  let imageUrl = "";

  // Check if an image file is provided and its size is greater than 0
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadToCloudinary(imageFile);
      if (!imageUrl) {
        return { message: "Image upload failed" };
      }
    } catch (error) {
      console.error(error.message);
      return { message: "Image upload failed" };
    }
  } else {
    return { message: "Image is required" };
  }

  meal.image = imageUrl;

  // Validate the meal object fields
  if (
    isInvalid(meal.title) ||
    isInvalid(meal.slug) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.instructions) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.creator_email) ||
    !meal.creator_email.includes("@")
  ) {
    return {
      message: "Invalid Input",
    };
  }

  // console.log(meal);

  try {
    const result = await saveMeal(meal);
    // console.log(result);
    if (result.message === "Meal Saved Successfully") {
      revalidatePath("/meals/share");
    }
    return result;
  } catch (error) {
    console.error(error.message);
    return { message: "Saving meal failed" };
  }
}
