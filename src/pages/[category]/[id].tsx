import { get } from "@/libs/api";
import { Category, IdProps, MAIN } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Seo from "@/components/utils/Seo";
const Detail = ({ data }: { data: MAIN }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleAButton = () => {
    setShowAlert(true);
  };

  const handleAlertButton = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const getDate = async () => {
      const data = await axios
        .get(`/api/main/post?id=${"17"}`)
        .then((res: any) => {
          console.log(res);
          return res.data;
        });
      console.log("Data", data);
    };

    getDate();
  });
  return (
    <>
      <Seo />
      <button onClick={handleAButton}>custom alert</button>
      <div>{data.category}</div>
      <div>{data.contact}</div>
      <div>{data.context}</div>
      <div>{data.createDate.toString()}</div>
      <div>{data.endDate.toString()}</div>
      <div>{data.images}</div>
      <div>{data.nickname}</div>
      <div>{data.title}</div>
      <div>{data.view}</div>
      {showAlert && (
        <Modal>
          <p>글 작성 됐어요!</p>
          <AlertBtn onClick={handleAlertButton}>닫기</AlertBtn>
        </Modal>
      )}
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

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 40vw;
  height: 40vh;
  margin: 0 auto;

  background-color: white;
  border: 1px solid #999999;
`;

const AlertBtn = styled.button`
  width: 50%;
`;
