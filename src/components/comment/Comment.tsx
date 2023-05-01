import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get, post } from "@/libs/api";
import customAlert from "../modal/CustomModalAlert";
import Btn from "../utils/Btn";

import CommentDetail from "./CommentDetail";
import { useComment, usePostComment } from "@/hooks/main/comment";
import { COMMENT } from "@/types";

//todo: 게시글 글 보다 댓글 폰트가 더 커서 보기에 불편
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

  // const [list, setList] = useState<Comment[]>();

  const { data: list, page, setPage } = useComment(postId);
  const postComment = usePostComment();
  const handleSubmitComment = () => {
    if (newComment.length === 0) {
      customAlert("댓글을 작성해주세요");
      return;
    } else {
      postComment({ postId, newComment });
      setNewComment("");
    }
  };

  return (
    <>
      {list?.length ? (
        <>
          {list.map((el: COMMENT) => (
            <CommentDetail item={el} key={el.id} postId={postId} />
          ))}
        </>
      ) : (
        <Notion>첫 번째로 댓글을 달아 보세요!</Notion>
      )}

      <CommentContainer>
        <CommentInput
          placeholder="댓글을 작성해 주세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Btn onClick={handleSubmitComment}>저장하기</Btn>
      </CommentContainer>
    </>
  );
};

export default Comment;

//todo: form 사용하지 않고 댓글 달기
export const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  height: 10vh;
  padding: 5px;

  background-color: transparent;
  border: none;
  border-radius: 5px;

  outline: none;
  resize: none;

  box-shadow: 0px 0px 5px -1.5px inset ${({ theme }) => theme.color.main};
`;

const Notion = styled.p`
  margin-bottom: 1rem;

  color: black;

  text-align: center;
`;

const DateP = styled.p`
  float: left;
  margin-bottom: 2rem;

  color: #f0f0f0;

  font-size: small;
  text-align: left;
`;
