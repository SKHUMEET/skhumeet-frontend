import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { User, storageConstants } from "@/types";
import { del, instance } from "@/libs/api";
import customAlert from "../modal/CustomModalAlert";
import Btn from "../utils/Btn";
import { COMMENT } from "@/types";
import { useDeleteComment, useUpdateComment } from "@/hooks/main/comment";

const CommentDetail = ({ item, postId }: { item: COMMENT; postId: number }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<User>();
  const [editComment, setEditComment] = useState<string>(item.context);
  const updateComment = useUpdateComment();
  const deleteCommnet = useDeleteComment();
  const handleDeleteComment = async (id: number) => {
    deleteCommnet({ postId, commentId: id });
  };

  const handlePatchComment = async () => {
    if (editComment.length === 0) {
      customAlert("댓글을 작성해주세요");
      return;
    } else {
      updateComment({ postId, commentId: item.id, editComment });
      setIsEdit(false);
    }
  };

  useEffect(() => {
    const storedUser: User | null =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(storageConstants.user) ?? "{}")) ??
      null;
    setUser(storedUser as User);
  }, []);

  return (
    <Container>
      <CommentItem>
        {!isEdit ? (
          <>
            <span>{item.context}</span>
            <WriteDate>
              {item.modifiedDate.replace("T", " ")} &nbsp; &#183; &nbsp;
              {item.writer}
            </WriteDate>
          </>
        ) : (
          <CommentContainer>
            <CommentInput
              placeholder="댓글을 작성해 주세요"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
            <Btn onClick={handlePatchComment}>수정하기</Btn>
          </CommentContainer>
        )}
        {user?.name === item.writer && (
          <EditWrapper>
            <span onClick={() => setIsEdit(!isEdit)}>
              {isEdit ? "취소" : "수정"}
            </span>
            <span onClick={() => handleDeleteComment(item.id)}>삭제</span>
          </EditWrapper>
        )}
      </CommentItem>
    </Container>
  );
};

export default CommentDetail;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  border-bottom: 1px dashed #d3d3d3;
  font-size: 12px;
  position: relative;
`;
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
const CommentItem = styled.div`
  width: 100%;
  color: black;
`;

const WriteDate = styled.p`
  margin-top: 10px;

  color: ${({ theme }) => theme.color.lightText};

  font-size: x-small;
`;

const EditWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  right: 0;
  position: absolute;

  > span {
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.color.hover};
    }
  }
`;
