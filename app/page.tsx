// app/page.tsx
"use client";
import classNames from "classnames";
import style from "./page.module.scss";

const HomePage = () => {
  const domain = "https://api-oneislam.vercel.app";
  return (
    <>
      <h1 className={classNames(style.h1)}>Quran</h1>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>quran metadata</p>
        <a
          href={`${domain}/api/quran`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/quran
        </a>
      </div>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>quran in specific language</p>
        <p className={classNames(style.p)}>
          {domain}/api/quran/{"{language}"}/original
        </p>
        <a
          href={`${domain}/api/quran/Arabic/original`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/quran/Arabic/original
        </a>
      </div>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>
          quran in specific language with specific script version
        </p>
        <p className={classNames(style.p)}>
          {domain}/api/quran/{"{language}"}/{"{version}"}
        </p>
        <a
          href={`${domain}/api/quran/Arabic/original`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/quran/Arabic/original
        </a>
        <a
          href={`${domain}/api/quran/Arabic/latin`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/quran/Arabic/latin
        </a>
        <a
          href={`${domain}/api/quran/Arabic/latin-diacritical`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/quran/Arabic/latin-diacritical
        </a>
      </div>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>quran specific chapter</p>
        <p className={classNames(style.p)}>
          {domain}/api/quran/{"{language}"}/{"{version}"}/{"{chapter}"}
        </p>
        <a
          href={`${domain}/api/quran/Arabic/original/1`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/quran/Arabic/original/1
        </a>
      </div>

      <h1 className={classNames(style.h1)}>Hadith</h1>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>hadith all books metadata</p>
        <a
          href={`${domain}/api/hadith`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/hadith
        </a>
      </div>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>hadith specific book metadata</p>
        <p className={classNames(style.p)}>
          {domain}/api/hadith/{"{book}"}
        </p>
        <a
          href={`${domain}/api/hadith/abudawud`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/hadith/abudawud
        </a>
      </div>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>
          hadith full book in specific language
        </p>
        <p className={classNames(style.p)}>
          {domain}/api/hadith/{"{book}"}/{"{language}"}
        </p>
        <a
          href={`${domain}/api/hadith/abudawud/english`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/hadith/abudawud/english
        </a>
      </div>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>
          hadith book specific chapter / inner-book
        </p>
        <p className={classNames(style.p)}>
          {domain}/api/hadith/{"{book}"}/{"{language}"}/{"{chapter/x}"}
        </p>
        <a
          href={`${domain}/api/hadith/abudawud/arabic/chapter/1`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/hadith/abudawud/arabic/chapter/1
        </a>
      </div>
      <div className={classNames(style.flex)}>
        <p className={classNames(style.p)}>
          hadith book specific verse / hadith
        </p>
        <p className={classNames(style.p)}>
          {domain}/api/hadith/{"{book}"}/{"{language}"}/{"{verse/x}"}
        </p>
        <a
          href={`${domain}/api/hadith/abudawud/arabic/verse/1`}
          target="_blank"
          className={classNames(style.a)}
        >
          {domain}/api/hadith/abudawud/arabic/verse/1
        </a>
      </div>
    </>
  );
};

export default HomePage;
