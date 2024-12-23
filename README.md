## 🌍 API - Documentation: `api-oneislam`

### Rest and Robust Quran and Hadith API

This API provides access to the **`Quran`** in over 95 languages and various **`Hadith`** collections. You can retrieve the Quran in its original script, transliteration (Latin), and Latin with diacritical marks. Hadiths are available in both Arabic and English for now. Below are simple instructions for using the API.

---

# 📖 Quran

#### 1. Base URL

```bash
https://api-oneislam.vercel.app/
```

#### 2. Quran Metadata

```bash
 GET /api/quran
```

**Try it here**: [https://api-oneislam.vercel.app/api/quran](https://api-oneislam.vercel.app/api/quran)

#### 3. Quran in a Specific Language

```bash
 GET /api/quran/{Language}/{Version}
```

| Parameter  | Type     | Description                                                                                                                                                                                             |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Language` | `String` | **String & Capitalization Required**. Pass the language as a string to get the Quran in the specified language for all chapters.                                                                        |
| `Version`  | `String` | **Required with Language**. The Quran has three versions: "original" (for the original script), "latin" (for Latin script), and "latin-diacritical" (Latin script with diacritical marks) if supported. |

**Languages**: Supported languages can be retrieved from the metadata endpoint.

- Examples of supported languages: "English", "Achinese", "Arabic", "Chinese_Traditional", "Urdu", "Indonesian", etc.
- For a list of supported languages, refer to this file: [LangArray.ts](https://raw.githubusercontent.com/haseebllc/api-oneislam/main/app/api/quran/%5B...slug%5D/LangArray.ts)

**Versions**: Each language can have these versions:

- `original`: Original script.
- `latin`: Latin script.
- `latin-diacritical`: Latin script with diacritical marks.

**Example**: [https://api-oneislam.vercel.app/api/quran/Arabic/original](https://api-oneislam.vercel.app/api/quran/Arabic/original)

**Example**: [https://api-oneislam.vercel.app/api/quran/Arabic/latin](https://api-oneislam.vercel.app/api/quran/Arabic/latin)

**Example**: [https://api-oneislam.vercel.app/api/quran/Arabic/latin-diacritical](https://api-oneislam.vercel.app/api/quran/Arabic/latin-diacritical)

#### 4. Quran Specific Chapter

```bash
 GET /api/quran/{Language}/{Version}/{chapter}
```

**Example**: [https://api-oneislam.vercel.app/api/quran/Japanese/original/114](https://api-oneislam.vercel.app/api/quran/Japanese/original/114)

---

# 📚 Hadith

#### 1. Base URL

```bash
https://api-oneislam.vercel.app/
```

#### 2. Hadith All Books Metadata

```bash
 GET /api/hadith
```

**Try it here**: [https://api-oneislam.vercel.app/api/hadith](https://api-oneislam.vercel.app/api/hadith)

#### 3. Hadith Specific Book Metadata

```bash
 GET /api/hadith/{bookname}
```

**Example**: [https://api-oneislam.vercel.app/api/hadith/abudawud](https://api-oneislam.vercel.app/api/hadith/abudawud)

#### 4. Specific Book Metadata & Hadiths

```bash
 GET /api/hadith/{bookname}/{language}
```

Including the language parameter returns both metadata and all Hadiths from the specified book. Be aware that Hadith books contain around 5,000 to 7,000 Hadiths, making this a large dataset.

**Example**: [https://api-oneislam.vercel.app/api/hadith/bukhari/english](https://api-oneislam.vercel.app/api/hadith/bukhari/english)

#### 5. Specific Book, Specific Chapter

```bash
 GET /api/hadith/{bookname}/{language}/{chapter(X)}
```

Each Hadith book contains multiple chapters. To avoid large data loads, it is recommended to fetch data in chunks. This method loads quickly due to smaller datasets, and you can fetch the next chapter when needed.

**Example**: [https://api-oneislam.vercel.app/api/hadith/abudawud/english/chapter1](https://api-oneislam.vercel.app/api/hadith/abudawud/english/chapter1)

#### 6. Specific Book, Specific Hadith or Verse

```bash
 GET /api/hadith/{bookname}/{language}/{verse(X)}
```

This endpoint returns a specific Hadith or verse from the desired book.

**Example**: [https://api-oneislam.vercel.app/api/hadith/abudawud/english/verse1000](https://api-oneislam.vercel.app/api/hadith/abudawud/english/verse1000)

---

# 📝 JavaScript / ReactJS / NextJS / TypeScript Example

- Fetch metadata and pass parameters to get specific data.

```javascript
const [metaData, setMetaData] = useState<any[]>([]);
const apiBase = "https://api-oneislam.vercel.app";

useEffect(() => {
  const fetchData = async () => {
    const data = await GetQuranMetaData();
    if (data) setMetaData(data);
  };
  fetchData();
}, []);

const surah = await metaData[0].chapter_details.find(
  (elem: any) => elem.language === user_click_on_language_we_mapped_from_metadata
);

const firstLangData = await GetQuran__SoloChapter(
  surah.language,
  surah.links[0], // original
  chapterNumberUserRequested,
);
```

- Fetch data based on parameters.

```javascript
import axios from "axios";
const apiBase = "https://api-oneislam.vercel.app";

// Get Quran Metadata
export const GetQuranMetaData = async () => {
  try {
    const apiUrl = `${apiBase}/api/quran`;
    const res = await axios.get(apiUrl);
    const data = await res.data;
    return data;
  } catch (err) {
    return console.error("Error:", err);
  }
};

// Get All Quran Chapters in a Specific Language
export const GetQuran__AllChapters = async (
  language: string,
  version: string
) => {
  try {
    const apiUrl = `${apiBase}/api/quran/${language}/${version}`;
    const res = await axios.get(apiUrl);
    const data = await res.data;
    return data;
  } catch (err) {
    return console.log("Error:", err);
  }
};

// Get Specific Quran Chapter in a Specific Language
export const GetQuran__SoloChapter = async (
  language: string,
  version: string,
  chapter: string | number
) => {
  try {
    const apiUrl = `${apiBase}/api/quran/${language}/${version}/${chapter}`;
    const res = await axios.get(apiUrl);
    const data = await res.data;
    return data;
  } catch (err) {
    return console.log("Error:", err);
  }
};
```
