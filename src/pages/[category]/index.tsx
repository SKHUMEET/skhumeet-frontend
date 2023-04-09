import ListBody from "@/components/List/ListBody";
import Seo from "@/components/utils/Seo";
import React from "react";
import { Category, ConvertKorean, CategoryProps } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const index = ({ category }: CategoryProps) => {
  return (
    <>
      <Seo title={ConvertKorean[category]} />
      <ListBody category={category} />
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps<CategoryProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const category = query.category as Category;

  return {
    props: {
      category,
    },
  };
};
