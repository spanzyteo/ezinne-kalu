import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const backendResponse = await axios.post(
      "https://ezinne-api.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

    const data = await backendResponse.data;

    if (backendResponse.status !== 200) {
      return NextResponse.json({
        message: "Login failed",
        status: backendResponse.status,
      });
    }

    const response = NextResponse.json({
      success: true,
      user: data.user,
      message: data.message,
    });

    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
