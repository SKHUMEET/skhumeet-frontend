import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { IdProps } from "@/types";
import Seo from "@/components/utils/Seo";

const Detail = ({ id }: IdProps) => {
  console.log(id);
  return (
    <>
      <Seo title="한솥밥" />
      <div>index</div>
    </>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps<IdProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const id = query.id as string;

  return {
    props: {
      id,
    },
  };
};
