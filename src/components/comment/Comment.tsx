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
        <Notion>댓글없음</Notion>
      )}

      <CommentContainer onSubmit={handleSubmitComment}>
        <CommentInput
          placeholder="Write comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Btn onClick={() => {}}>저장하기</Btn>
      </CommentContainer>
    </>
  );
};

export default Comment;

const CommentContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentInput = styled.textarea`
  width: 50vw;
  height: 5vh;

  border: none;
  border-bottom: 1px solid black;

  outline: none;
`;

const Notion = styled.p`
  color: black;
`;

const DateP = styled.p`
  float: left;
  margin-bottom: 2rem;

  color: #f0f0f0;

  font-size: small;
  text-align: left;
`;
