import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get, post } from "@/libs/api";
import customAlert from "../modal/CustomModalAlert";
import Btn from "../utils/Btn";

import CommentDetail from "./CommentDetail";

export interface Comment {
  author: string;
  childComments: string[];
  context: string;
  id: number;
  modifiedDate: string;
  writer: string;
}

const Comment = ({ postId }: { postId: number }) => {
  const [newComment, setNewComment] = useState<string>("");

  const [list, setList] = useState<Comment[]>();

  useEffect(() => {
    const getComment = async () => {
      await get(`/api/comment/${postId}/page/1`).then((res: any) => {
        setList(res.data);
      });
    };
    getComment();
  }, []);

  const handleSubmitComment = () => {
    if (newComment.length === 0) {
      customAlert("댓글을 작성해주세요");
      return;
    }

    post(`/api/comment/new`, {
      postId,
      context: newComment,
    });
  };

  return (
    <>
      {list?.length ? (
        <>
          {list.map((el) => (
            <CommentDetail item={el} key={el.id} postId={postId} />
          ))}
        </>
      ) : (
        <Notion>첫 번째로 댓글을 달아 보세요!</Notion>
      )}

      <CommentContainer onSubmit={handleSubmitComment}>
        <CommentInput
          placeholder="댓글을 작성해 주세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Btn onClick={() => {}}>저장하기</Btn>
      </CommentContainer>
    </>
  );
};

export default Comment;

export const CommentContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  height: 4vh;
  margin-top: 5px;

  border: none;
  border-bottom: 1px solid black;

  outline: none;
  resize: none;
`;

const Notion = styled.p`
  margin-top: 1rem;
  margin-bottom: 5px;

  color: black;
`;

const DateP = styled.p`
  float: left;
  margin-bottom: 2rem;

  color: #f0f0f0;

  font-size: small;
  text-align: left;
`;
