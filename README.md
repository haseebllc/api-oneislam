
## 🌍 API - Documentation : `api-oneislam` 
 

This API gives access to the **`Quran`** in 95+ languages and various **`Hadith`** books. You can get the Quran in its original script, transliteration (Latin), and Latin with diacritical marks. Below are simple instructions to use the API.

--      

# 📖 Quran

#### 1. Base URL
 ```bash
https://api-oneislam.vercel.app/
```

#### 2. Quran Metadata
 ```javascript
  GET /api/quran
```
**try it here** : `https://api-oneislam.vercel.app/api/quran`

#### 3. Quran in specific Language
 ```javascript
  GET /api/quran/{Language}/{Version}
``` 
| Parameter | Type | Description  |
| :-------- | :------- |:------------------------- |
| `Language` | `String` | **String & Capitalize Required**. you can pass a language as string if you want the quran all chapters in specefic language. | 
| `Version` | `String` | **Required with Language**. All languages have "original" version supported but the language have "latin" and "latin-diacritical" version if language support these.|


`Languages` : you can get supported languages from metadata route.  
- "English" "Achinese" "Arabic" "Chinese_Traditional" "Urdu" "Indonesian" etc.

`Versions` : there are three versions for the language:
- `original` : for original script.
- `latin`: for latin script.
- `latin-diacritical` : for latin script with diacritical marks.

**Example** : `https://api-oneislam.vercel.app/api/quran/Arabic/original`

 #### 4. Quran specific Chapter
 ```javascript
  GET /api/quran/{Language}/{Version}/{chapter}
``` 
**Example** : `https://api-oneislam.vercel.app/api/quran/Arabic/original/114`

--         

# 📚 Hadith 

#### 1. Base URL
 ```bash
https://api-oneislam.vercel.app/
```

#### 2. Hadith all-books Metadata
 ```javascript
  GET /api/hadith
```
**try it here** : `https://api-oneislam.vercel.app/api/hadith`


#### 3. Hadith specefic-book Metadata
 ```javascript
  GET /api/hadith/{bookname}
```
**Example** : `https://api-oneislam.vercel.app/api/hadith/abudawud`



 #### 4. Specefic-Book Metadata & Hadiths
 ```javascript
  GET /api/hadith/{bookname}/{language}
``` 
Adding language parameter will return metadata and all hadiths of book. It is large dataset because every hadith book hadiths are around 5000 to 7000.

**Example** : `https://api-oneislam.vercel.app/api/hadith/abudawud`


 #### 5. Specefic-Book Hadiths in chunk
 ```javascript
  GET /api/hadith/{bookname}/{language}/{chunk(X)}
``` 
chunks are usefull for large dataset they return data in chunks in our-case there are maximum 7 chunks `chunk1` , `chunk2` .... `chunk7` each chunk contain 1000 (one-thousand) hadiths but if the book have more than 7 thousan hadiths for example abudawud have 7500 hadiths the chunk7 contain 6000 to 7500 hadiths it have more than 1 thousand hadith due to maximum chunk limit and if abudawud have 300 hadiths it will be in chunk1 becuse chunk1 have 0 to 1000 hadiths and chunk2 will return erorr.

**Example** : `https://api-oneislam.vercel.app/api/hadith/abudawud/chunk1`


 #### 6. Specefic-Book Specific-Hadith or Verse
 ```javascript
  GET /api/hadith/{bookname}/{language}/{verse}/{number}
``` 
**Example** : `https://api-oneislam.vercel.app/api/hadith/abudawud/verse/100`


--         

# 📝 Javascript / ReactJs / NextJs /TypeScript Example

- fetch metadata and forward parameters to get specefic data

```javascript
const apiBase = "https://api-oneislam.vercel.app";
const [metaData, setMetaData] = useState<any[]>([]);
const [metaData, setMetaData] = useState<any[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const data = await GetQuranMetaData();
    if (data) setMetaData(data);
    };
    fetchData();
  }, []);

  const targetMeta = await metaData[0].chapter_details.find(
  (elem: any) => elem.surahNo === userClickedOnSurahIndex);
           
  const firstLangData = await GetQuran__SoloChapter(
    targetMeta.language, 
    targetMeta.links[0], // original 
    targetMeta[index + 1],
  );

```

- fetch data based on parameters
```javascript
import axios from "axios";
const apiBase = "https://api-oneislam.vercel.app";

// Get Quran Meta-Data
export const GetQuranMetaData = async () => {
  try {
    const apiUrl = `${apiBase}/api/quran`;
    const res = await axios.get(apiUrl);
    const data = await res.data;
    return data;
  } catch (err) {
    return console.error("erorrr is:", err);
  }
};

// Get Quran All-Chapters in specific-language
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
    return console.log("erorrr is:", err);
  }
};

// Get Quran specific Chapters in specific-language
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
    return console.log("erorrr is:", err);
  }
};

```
