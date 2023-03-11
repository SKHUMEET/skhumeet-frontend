import React from "react";
import Head from "next/head";
const Seo = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title} | SKHUMEET</title>
    </Head>
  );
};

export default Seo;
