import { connect } from "@/dbConfig/dbConfig";
import Meal from "@/models/mealModel";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  await connect();
  try {
    console.log("Connecting to the database...");

    const session = await getServerSession(authOptions);

    // console.log("Session:", session);

    if (!session) {
      console.log("No session found. Returning 401.");
      return NextResponse.json(
        { error: "You must be signed in to view this content." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    // console.log("User Email:", userEmail);

    const dummyMeals = await Meal.find({ isDummy: true });
    // console.log("Dummy Meals:", dummyMeals);

    let userMeals = [];
    if (userEmail) {
      userMeals = await Meal.find({ creator_email: userEmail });
      // console.log("User Meals:", userMeals);
    }

    const allMeals = [...dummyMeals, ...userMeals];
    // console.log("All Meals:", allMeals);

    return NextResponse.json({
      message: "All Meals",
      data: allMeals,
    });
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
