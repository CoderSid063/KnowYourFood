import { connect } from "@/dbConfig/dbConfig";
import Meal from "@/models/mealModel";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { ObjectId } from "mongodb";

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

export async function DELETE(req) {
  await connect();

  try {
    const session = getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be signed in to delete this content." },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    // console.log("id is :", id);
    if (!id) {
      return NextResponse.json(
        {
          error: "Meal ID is required",
        },
        {
          ststus: 400,
        }
      );
    }

    const result = await Meal.findByIdAndDelete(new ObjectId(id));
    if (!result) {
      return NextResponse.json({ error: "Meal not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Meal deleted successfully." },
      { ststus: 202 }
    );
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
