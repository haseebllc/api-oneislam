// app/api/quran/route.tsx
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiURL = `https://raw.githubusercontent.com/haseebllc/quran-hadith-json/refs/heads/main/quran/metadata.json`;
    const res = await fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let jsondata = await res.json();

    return NextResponse.json(jsondata, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow methods
        "Access-Control-Allow-Headers": "Content-Type", // Allow headers
      },
    });
  } catch (error) {
    console.error("Error processing the request: ", error);
    return NextResponse.json(
      { success: false, message: "An error occurred in the server." },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
