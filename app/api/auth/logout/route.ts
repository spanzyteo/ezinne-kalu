import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    try {
      const backendResponse = await axios.post(
        "https://ezinne-api.onrender.com/api/auth/logout"
      );
      console.log(backendResponse.status)
    } catch (error) {
      console.log("Logout failed:", error);
    }
  
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully"
    })

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // This immediately expires the cookie
    });

    return response
  } catch (error) {
   console.error("Logout API error:", error);
   return NextResponse.json(
     { success: false, message: "Logout failed" },
     { status: 500 }
   ); 
  }


}