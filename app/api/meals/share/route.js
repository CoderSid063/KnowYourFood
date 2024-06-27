import { connect } from "@/dbConfig/dbConfig";
import Meal from "@/models/mealModel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connect();

  try {
    const meal = await req.json();
    // console.log("api meal", meal);

    const newMeal = new Meal({
      ...meal,
      isDummy: meal.isDummy || false, // Ensure isDummy is set or default to false
    });
    // console.log("newMeal", newMeal);

    const savedMeal = await newMeal.save();
    // console.log("savedMeal", savedMeal);

    return NextResponse.json(
      {
        message: "Meal Saved Successfully",
        meal: savedMeal,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ Errorinroute: error.message }, { status: 400 });
  }
}
