// app/api/quran/quran/[...slug]/route.tsx
import { NextResponse } from "next/server";
import { languagesArray } from "./LangArray";
interface paramsType {
  params: {
    slug: [
      langName__param: string,
      langVersion__param: string,
      chapter__param: string,
      verse__param: string
    ];
  };
}

export async function GET(request: Request, { params }: paramsType) {
  try {
    // strictly required await in param & slug --
    const { slug } = params;
    const [langName__param, langVersion__param, chapter__param, verse__param] =
      slug;

    // getting version-file requested in slug
    const langVersion =
      langVersion__param === "original"
        ? "array"
        : langVersion__param === "latin"
        ? "array_la"
        : langVersion__param === "latin-diacritical"
        ? "array_lad"
        : `${langVersion__param}`;

    const langName__Exist = languagesArray.find(
      (item) => item === langName__param || langName__param == item
    );
    if (!langName__Exist) {
      return NextResponse.json(
        { msg: `No data found for specefic ${langName__param} language!` },
        { status: 404 }
      );
    } else if (langName__Exist && !langVersion__param) {
      return NextResponse.json(
        {
          msg: [
            `define ${langName__param} language script-version`,
            `for ex : ${langName__param}/original , ${langName__param}/latin , ${langName__param}/latin-diacritical`,
          ],
        },
        { status: 401 }
      );
    }

    try {
      const apiURL = `https://raw.githubusercontent.com/haseebllc/quran-hadith-json/refs/heads/main/quran/edition/${langName__param}/${langVersion}.json`;
      const res = await fetch(apiURL);
      const data = await res.json();
      let jsondata = await data;

      // chapter target --
      if (chapter__param) {
        const chapter = await jsondata.find(
          (elem: any) =>
            elem.chapter == chapter__param || chapter__param === elem.chapter
        );
        if (!chapter) {
          return NextResponse.json(
            { msg: `${chapter__param} doesn't exist try between 1 & 114` },
            { status: 404 }
          );
        }

        if (verse__param) {
          const verse = chapter.verses.find(
            (elem: any, index: number) => verse__param === `${index + 1}`
          );

          if (!verse) {
            return NextResponse.json(
              { msg: "no verse found" },
              { status: 404 }
            );
          }
          return NextResponse.json(
            { verse: verse },
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*", // Allow all origins
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow methods
                "Access-Control-Allow-Headers": "Content-Type", // Allow headers
              },
            }
          );
        }
        return NextResponse.json(chapter, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*", // Allow all origins
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow methods
            "Access-Control-Allow-Headers": "Content-Type", // Allow headers
          },
        });
      }
      return NextResponse.json(jsondata, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow all origins
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow methods
          "Access-Control-Allow-Headers": "Content-Type", // Allow headers
        },
      });
    } catch (err) {
      return NextResponse.json(
        {
          msg: [
            `No data found for specefic ${langName__param} language ${langVersion__param} version!`,
            `try ${langName__param}/original , ${langName__param}/latin or ${langName__param}/latin-diacritical`,
          ],
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "some server erorr! try again later." },
      { status: 500 }
    );
  }
}

// Optional: Use a database (like MongoDB or PostgreSQL) for handling large datasets
// Alternatively, use caching strategies (Redis or similar) to store and serve frequestuently queried data

// Config to use Edge functions or Node.js serverless function to prevent request.url bug
// for next-js under version 14 --
// export const config = {
//   runtime: "edge", // Adjust this based on your needs, 'nodejs' might be a better fit for large data
// };

// for next-js version 14+ --
// Updated configuration for Next.js 14
// export const runtime = "edge";
