import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { IdProps } from "@/types";

const Detail = ({ id }: IdProps) => {
  return <div>Detail</div>;
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
