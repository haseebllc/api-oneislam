// app/api/hadith/route.tsx
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiURL = `https://raw.githubusercontent.com/gitswirl/Hadith-Api/refs/heads/main/chunk-files/metadata.json`;
    const res = await fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    let jsondata: any[] = await data;

    if (!jsondata || jsondata === undefined) {
      return NextResponse.json(
        {
          success: false,
          status: 500,
          message: "cannot fetch data from github api!",
        },
        { status: 500 }
      );
    }

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
      {
        success: false,
        status: 500,
        message: "An error occurred in the server.",
      },
      { status: 500 }
    );
  }
}
