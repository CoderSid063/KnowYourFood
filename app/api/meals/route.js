import { connect } from "@/dbConfig/dbConfig";
import Meal from "@/models/mealModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  try {
    const meals = await Meal.find({});
    return NextResponse.json({
      mesaaage: "All Meals",
      data: meals,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
