import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await User.findById(newUser._id).select("-password");

    // console.log(savedUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
