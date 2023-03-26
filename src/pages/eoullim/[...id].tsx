import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { IdProps } from "@/types";
import Seo from "@/components/utils/Seo";

const Detail = ({ id }: IdProps) => {
  <>
    <Seo title="어울림" />
    console.log(id); return <div>Detail</div>
  </>;
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
