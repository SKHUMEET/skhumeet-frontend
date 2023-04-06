import { Category, IdProps } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

const Detail = ({ category, id }: IdProps) => {
  return <div>[id]</div>;
};

export default Detail;
export const getServerSideProps: GetServerSideProps<IdProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const category = query.category as Category;
  const id = query.id as unknown as number;

  return {
    props: {
      category,
      id,
    },
  };
};
