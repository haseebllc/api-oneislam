// app/page.tsx
"use client";
import classNames from "classnames";
import style from "./page.module.scss";

const HomePage = () => {
  const domain = "https://api-oneislam.vercel.app/api";
  return (
    <>
      <div className={classNames(style.docsLinkContainer)}>
        <div className={classNames(style.quranLinkBox, style.linkBox)}>
          <h1>quran</h1>
          <div className={classNames(style.metadata)}>
            <p>1. quran metadata :</p>
            <a target="_blank" href={`${domain}/quran`}>
              https://api-oneislam.vercel.app/api/quran
            </a>
          </div>

          <div className={classNames(style.spfLang)}>
            <p>2. quran in specific language : </p>
            <p>
              https://api-oneislam.vercel.app/api/quran/{"{language}"}/
              {"{script-version}"}
            </p>
            <p>
              where language you can put any language provided in
              <a
                target="_blank"
                href="https://github.com/gitswirl/api-oneislam"
              >
                {" "}
                langArray
              </a>{" "}
              or from{" "}
              <a
                target="_blank"
                href="https://github.com/gitswirl/api-oneislam"
              >
                metadata
              </a>
            </p>
            <p>
              for example :{" "}
              <a target="_blank" href={`${domain}/quran/Arabic/original`}>
                https://api-oneislam.vercel.app/api/quran/Arabic/original
              </a>
            </p>
          </div>

          <div className={classNames(style.spfScrptvrsn)}>
            <p>3. quran in specific script version :</p>
            <p>
              https://api-oneislam.vercel.app/api/quran/{"{language}"}/
              {"{script-version}"}
            </p>
            <p>
              where script-verson you can put version of script provided in{" "}
              <a
                target="_blank"
                href="https://github.com/gitswirl/api-oneislam"
              >
                metadata
              </a>
            </p>
            <p>there are three script-versions</p>
            <p>
              1. <span>orignal</span> : for orignal script
            </p>
            <p>
              2. <span>latin</span> : for latin script
            </p>
            <p>
              3. <span>latin-diacritical</span> : for latin script with
              diacritical marks
            </p>
            <p>
              for example :
              <a target="_blank" href={`${domain}/quran/Arabic/original`}>
                https://api-oneislam.vercel.app/api/quran/Arabic/original
              </a>
            </p>
          </div>
        </div>

        <div className={classNames(style.hadithLinkBox, style.linkBox)}>
          <h1>hadith</h1>
          <div className={classNames(style.metadata)}>
            <p>1. hadith metadata :</p>
            <a target="_blank" href={`${domain}/hadith`}>
              https://api-oneislam.vercel.app/api/hadith
            </a>
          </div>

          <div className={classNames(style.spfLang)}>
            <p>2. specific hadith book metadata : </p>
            <p>https://api-oneislam.vercel.app/api/hadith/{"{book}"}</p>
            <p>
              where book you can put any book provided in
              <a
                target="_blank"
                href="https://github.com/gitswirl/api-oneislam"
              >
                {" "}
                bookLangArray
              </a>{" "}
              or from{" "}
              <a
                target="_blank"
                href="https://github.com/gitswirl/api-oneislam"
              >
                metadata
              </a>
            </p>
            <p>
              for example :{" "}
              <a target="_blank" href={`${domain}/hadith/abudawud`}>
                https://api-oneislam.vercel.app/api/hadith/abudawud
              </a>
            </p>
          </div>

          <div className={classNames(style.spfLang)}>
            <p>3. specific book all hadiths with its metadata included: </p>
            <p>
              https://api-oneislam.vercel.app/api/hadith/{"{book}"}/
              {"{language}"}
            </p>
            <p>
              if language added in url it return all data which is large
              dataset. get languages from
              <a
                target="_blank"
                href="https://github.com/gitswirl/api-oneislam"
              >
                {" "}
                bookLangArray
              </a>{" "}
              or from{" "}
              <a
                target="_blank"
                href="https://github.com/gitswirl/api-oneislam"
              >
                metadata
              </a>
            </p>
            <p>
              for example :{" "}
              <a target="_blank" href={`${domain}/hadith/abudawud/english`}>
                https://api-oneislam.vercel.app/api/hadith/abudawud/english
              </a>
            </p>
          </div>

          <div className={classNames(style.spfScrptvrsn)}>
            <p>
              4. get hadiths from chunk files which will load quick on request
              because hadiths are large data sets:
            </p>
            <p>
              https://api-oneislam.vercel.app/api/hadith/{"{book}"}/
              {"{language}"}/{"{chunk1}"}
            </p>
            <p>
              where chunk1 you can put chunk1 to chunk7 every chunk have 1000
              hadith the last chunk can have more than 1000 but lower than 2000
              for example user requested 37 num hadith you can get from chunk1
              because it have hadith from 1 to 1000
            </p>
            <p>
              for example :
              <a
                target="_blank"
                href={`${domain}/hadith/abudawud/english/chunk1`}
              >
                https://api-oneislam.vercel.app/api/hadith/abudawud/english/chunk1
              </a>
            </p>
          </div>

          <div className={classNames(style.spfScrptvrsn)}>
            <p>
              5. get specific hadith verse from your desired hadith book and
              language.
            </p>
            <p>
              https://api-oneislam.vercel.app/api/hadith/{"{book}"}/
              {"{language}"}/{"{verse}"}/{"{number}"}
            </p>
            <p>where number you can add number of hadith you want</p>
            <p>
              for example :
              <a
                target="_blank"
                href={`${domain}/hadith/abudawud/english/verse/1`}
              >
                https://api-oneislam.vercel.app/api/hadith/abudawud/english/verse/1
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
