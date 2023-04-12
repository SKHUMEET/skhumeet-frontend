import React from "react";
import Head from "next/head";
const Seo = ({ title }: { title?: string }) => {
  return (
    <Head>
      <link rel="shortcut icon" href="skhumeet.ico" />
      <title>{title && `${title} |`} SKHUMEET</title>
    </Head>
  );
};

export default Seo;
