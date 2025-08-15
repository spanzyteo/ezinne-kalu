import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    const backendResponse = await axios.get(
      "https://ezinne-api.onrender.com/api/auth/verify", {
        headers: {
          'Cookie': `token=${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    
    if (backendResponse.status !== 200) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    const data = await backendResponse.data;
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}