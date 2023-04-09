import RegisterForm from "@/components/register/RegisterForm";
import Seo from "@/components/utils/Seo";
import { Category, CategoryProps } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

const register = ({ category }: CategoryProps) => {
  return (
    <>
      <Seo title="작성" />
      <RegisterForm category={category} />
    </>
  );
};

export default register;

export const getServerSideProps: GetServerSideProps<CategoryProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const category = (query?.category as Category) ?? null;

  return {
    props: {
      category,
    },
  };
};
