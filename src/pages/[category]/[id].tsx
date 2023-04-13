import { Category } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import styled from "styled-components";
import Seo from "@/components/utils/Seo";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/hooks/main";
import PostDetail from "@/components/PostDetail";

const Detail = ({ id }: { id: number }) => {
  const { data, isError, isLoading, error } = useQuery(["detail", id], () =>
    getPostById(id)
  );

  if (isLoading) return <>loading</>;
  return (
    <>
      <Seo />
      <PostDetail data={data} />
    </>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps<{ id: number }> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const category = query.category as Category;
  const id = query.id as unknown as number;

  return {
    props: {
      id,
    },
  };
};

const Container = styled.div`
  margin-top: 1rem;
`;
