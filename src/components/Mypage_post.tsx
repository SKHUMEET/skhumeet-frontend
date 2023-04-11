import axios from "axios";
import React, { useEffect, useState, useLayoutEffect } from "react";
import ListTable from "../components/List/ListTable";
import Pagination from "./Pagination";
import styled from "styled-components";

type kind = "내가 쓴 글" | "좋아요 누른 글";

export const User_post = ({ kind }: { kind: kind }) => {
  const [list, setList] = useState();

  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>();

  const [totalElements, setTotalElements] = useState<number>(0);

  const [url, setUrl] = useState("");

  useLayoutEffect(() => {
    switch (kind) {
      case "내가 쓴 글":
        setUrl(`/main/post/member?page=`);
        break;
      case "좋아요 누른 글":
        setUrl(`/main/like/member?page=`);
        break;
      default:
        setUrl("");
        break;
    }
  }, [kind]);

  useEffect(() => {
    const TOKEN = localStorage.getItem("accessToken");
    {
      url &&
        axios
          .get(`${url} ${page}`, {
            headers: {
              withCredentials: true,
              Authorization: `Bearer ${TOKEN}`,
            },
          })
          .then((data) => {
            setList(data.data.content);
            setTotalPage(data.data.totalPages);
            setTotalElements(data.data.totalElements);
          });
    }
  }, [page, url]);

  return (
    <>
      {totalPage && list ? (
        <UserPostContainer>
          {kind === "내가 쓴 글" && (
            // 임시
            <ListTable list={list} page={page} category={"hansotbab"} />
          )}
          {kind === "좋아요 누른 글" && (
            <ListTable list={list} page={page} category={"hansotbab"} />
          )}
          <Pagination
            totalPages={totalPage}
            currentPage={page}
            onPageChange={setPage}
          ></Pagination>
        </UserPostContainer>
      ) : (
        <UserPostContainer>
          <>There&apos;s no comment.</>
        </UserPostContainer>
      )}
    </>
  );
};

const UserPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  width: 100%;
`;
