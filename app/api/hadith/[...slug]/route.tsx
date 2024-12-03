import { NextResponse } from "next/server";
import { BookLangDetails } from "./BookLangArray";

interface ParamsType {
  params: { slug: string[] };
}

export async function GET(request: Request, { params }: ParamsType) {
  try {
    const [bookName_prm, language_prm, chunk_prm, verse_prm] = params.slug;

    // Book existence check
    const bookExist = BookLangDetails.findIndex(
      (elem) => elem.book === bookName_prm
    );
    if (bookExist === -1) {
      return NextResponse.json(
        { msg: `${bookName_prm} doesn't exist` },
        { status: 404 }
      );
    }

    // If no language is provided, fetch the English metadata
    if (!language_prm) {
      try {
        const apiURL = `https://raw.githubusercontent.com/gitswirl/Hadith-Api/refs/heads/main/chunk-files/book/${bookName_prm}/metadata.json`;
        const res = await fetch(apiURL);
        const jsonData = await res.json();
        return NextResponse.json(jsonData, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      } catch (error) {
        return NextResponse.json(
          { msg: `Can't fetch data from GitHub.` },
          { status: 404 }
        );
      }
    }

    // Language existence check
    const langExist = BookLangDetails.findIndex(
      (elem) => elem.language === language_prm
    );
    if (langExist === -1) {
      return NextResponse.json(
        { msg: `${language_prm} language doesn't exist in ${bookName_prm}` },
        { status: 404 }
      );
    }

    // If no chunk is provided, fetch the full book for the given language
    if (!chunk_prm) {
      try {
        const apiURL = `https://raw.githubusercontent.com/gitswirl/Hadith-Api/refs/heads/main/single-files/book/${bookName_prm}/${language_prm}.json`;
        const res = await fetch(apiURL, { cache: "no-store" });
        const jsonData = await res.json();
        return NextResponse.json(jsonData, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      } catch (err) {
        return NextResponse.json(
          { msg: `Can't fetch data from GitHub.` },
          { status: 404 }
        );
      }
    }

    // If a chunk is specified, fetch the corresponding chunk data for the given language
    if (chunk_prm) {
      const chunkMapping: Record<string, string> = {
        chunk1: "array1.json",
        chunk2: "array2.json",
        chunk3: "array3.json",
        chunk4: "array4.json",
        chunk5: "array5.json",
        chunk6: "array6.json",
        chunk7: "array7.json",
        verse: "verse",
      };
      const currentChunk = chunkMapping[chunk_prm];

      if (!currentChunk) {
        return NextResponse.json(
          { msg: `${chunk_prm} not found` },
          { status: 404 }
        );
      }

      if (currentChunk === chunkMapping.verse) {
        try {
          if (!verse_prm)
            return NextResponse.json(
              { msg: `define verse number after verse.` },
              { status: 401 }
            );
          const apiURL = `https://raw.githubusercontent.com/gitswirl/Hadith-Api/refs/heads/main/single-files/book/${bookName_prm}/${language_prm}.json`;
          const res = await fetch(apiURL, { cache: "no-store" });
          const data = await res.json();

          let verse_prm_int = parseInt(verse_prm);
          let jsonData = await data.hadiths.find(
            (elem: any) => elem.hadithnumber === verse_prm_int
          );
          if (jsonData) {
            return NextResponse.json(jsonData, {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
              },
            });
          }
          return NextResponse.json(data, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });
        } catch (err) {
          return NextResponse.json(
            { msg: `${chunk_prm} data not found` },
            { status: 404 }
          );
        }
      } else {
        try {
          const apiURL = `https://raw.githubusercontent.com/gitswirl/Hadith-Api/refs/heads/main/chunk-files/book/${bookName_prm}/${language_prm}/${currentChunk}`;
          const res = await fetch(apiURL);
          const jsonData = await res.json();
          return NextResponse.json(jsonData, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });
        } catch (err) {
          return NextResponse.json(
            { msg: `${chunk_prm} data not found` },
            { status: 404 }
          );
        }
      }
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { msg: `Server error! Please try again later.` },
      { status: 500 }
    );
  }
}
