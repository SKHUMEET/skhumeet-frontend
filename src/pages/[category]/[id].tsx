import { get } from "@/libs/api";
import { Category, MAIN, User, storageConstants } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Seo from "@/components/utils/Seo";

const Detail = ({ data }: { data: MAIN }) => {
  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    const storedUser: User | null =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(storageConstants.user) ?? "{}")) ??
      null;
    setUserId(storedUser?.memberNumber);
  }, []);

  return (
    <>
      <Seo />

      <Container>
        <div>{data.memberNumber === userId && <button>수정하기</button>}</div>
        {/* <button onClick={handleAButton}>custom alert</button> */}

        <div>
          작성자: {data.member} | 마감일: {data.endDate.toString()} | 작성일:
          {data.createDate.toString()}
          {data.createDate.toString()}
        </div>
        <div>조회수: {data.view}</div>
        <div>연락 방법: {data.contact}</div>
        <div dangerouslySetInnerHTML={{ __html: data.context }} />

        <div>{data.title}</div>
      </Container>
    </>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps<{ data: MAIN }> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const category = query.category as Category;
  const id = query.id as unknown as number;

  const data = await get(
    `http://api-skhumeet.duckdns.org/api/main/post?id=${id}`
  ).then((res: any) => {
    console.log(res);
    return res.data;
  });
  console.log("data", data);
  return {
    props: {
      data: data ?? null,
    },
  };
};

const Container = styled.div`
  margin-top: 1rem;
`;
