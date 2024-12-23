import { NextResponse } from "next/server";
import { BookLangDetails } from "./BookLangArray";
interface ParamsType {
  params: {
    slug: [
      book_slg: string,
      language_slg: string,
      chapter_nd_verse_string_slg: string,
      chapter_nd_verse_num_slg: string
    ];
  };
}

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (data) return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export async function GET(request: Request, { params }: ParamsType) {
  try {
    const [
      book_slg,
      language_slg,
      chapter_nd_verse_string_slg,
      chapter_nd_verse_num_slg,
    ] = params.slug;

    // Book existence check
    const bookExist = BookLangDetails.findIndex(
      (elem) => elem.book === book_slg
    );
    if (bookExist === -1)
      return NextResponse.json({ msg: "book not found." }, { status: 404 });

    // book-found && !languge-slug
    if (!language_slg) {
      const apiURL = `https://raw.githubusercontent.com/haseebllc/quran-hadith-json/refs/heads/main/hadith/book-wise/${book_slg}/metadata.json`;
      const jsonData = await fetchData(apiURL);
      return NextResponse.json(jsonData, { status: 200 });
    }

    // Language existence check
    const langExist = BookLangDetails.find(
      (elem) => elem.language === language_slg
    );
    if (!langExist) {
      return NextResponse.json({ msg: "Language not found" }, { status: 404 });
    }

    // fetch full-book if no chapter_nd_verse slug is provided
    if (!chapter_nd_verse_string_slg) {
      const apiURL = `https://raw.githubusercontent.com/haseebllc/quran-hadith-json/refs/heads/main/hadith/book-wise/${book_slg}/${language_slg}.json`;
      const jsonData = await fetchData(apiURL);
      return NextResponse.json(jsonData, { status: 200 });
    }

    // Handling chapter-verse slug request
    if (chapter_nd_verse_string_slg === "chapter") {
      if (chapter_nd_verse_num_slg) {
        const apiUrl = `https://raw.githubusercontent.com/haseebllc/quran-hadith-json/refs/heads/main/hadith/chapter-wise/${book_slg}/${language_slg}/chapter${chapter_nd_verse_num_slg}.json`;
        const data = await fetchData(apiUrl);
        if (!data || data === undefined) {
          return NextResponse.json(
            { msg: "no chapter found." },
            { status: 404 }
          );
        }
        return NextResponse.json(data, { status: 200 });
      }

      return NextResponse.json(
        { msg: "define chapter number, for ex : chapter/1" },
        { status: 401 }
      );

      //
    } else if (chapter_nd_verse_string_slg === "verse") {
      if (chapter_nd_verse_num_slg) {
        const apiUrl = `https://raw.githubusercontent.com/haseebllc/quran-hadith-json/refs/heads/main/hadith/chapter-wise/${book_slg}/metadata.json`;
        const data = await fetchData(apiUrl);

        const verseNumber = chapter_nd_verse_num_slg;
        const matchedElement = data.all_chapters_detail.findIndex(
          (elem: any) =>
            verseNumber >= elem.chapter_first_hadith &&
            verseNumber <= elem.chapter_last_hadith
        );

        if (matchedElement !== -1) {
          const apiUrl = `https://raw.githubusercontent.com/haseebllc/quran-hadith-json/refs/heads/main/hadith/chapter-wise/${book_slg}/${language_slg}/chapter${
            matchedElement + 1
          }.json`;
          const matchedElementData = await fetchData(apiUrl);
          const verseElement = matchedElementData.hadith_list.find(
            (elem: any) =>
              elem.hadithNum_inBook === verseNumber ||
              verseNumber == elem.hadithNum_inBook
          );
          if (!verseElement) {
            return NextResponse.json(
              { msg: "no verse found." },
              { status: 404 }
            );
          }
          return NextResponse.json(verseElement, { status: 200 });
        }

        return NextResponse.json(
          { error: "Chapter not found for the verse" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { msg: "define verse number , for ex : verse/1" },
        { status: 401 }
      );

      //
    } else {
      return NextResponse.json(
        {
          msg: "bad request available routes at this stage are /chapter/ or /verse/",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { msg: "server erorr, try again later." },
      { status: 500 }
    );
  }
}
