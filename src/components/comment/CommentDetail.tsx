import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { User, formDate, storageConstants } from "@/types";
import { del, instance } from "@/libs/api";
import customAlert from "../modal/CustomModalAlert";
import Btn from "../utils/Btn";
import { COMMENT } from "@/types";

const CommentDetail = ({ item, postId }: { item: COMMENT; postId: number }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<User>();
  const [editComment, setEditComment] = useState<string>(item.context);
  const handleDeleteComment = async (id: number) => {
    await del(`/api/comment/${id}`).then((res) => {
      customAlert("댓글이 삭제되었습니다.");
      router.reload();
    });
  };
  const handlePatchComment = async () => {
    if (editComment.length === 0) {
      customAlert("댓글을 작성해주세요");
      return;
    }

    await instance.patch(`/api/comment/${postId}/comment/${item.id}`, {
      context: editComment,
    });
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
        <Writer>{item.writer}</Writer>
        {!isEdit ? (
          <span>{item.context} </span>
        ) : (
          <div>
            <form onSubmit={handlePatchComment}>
              <input
                placeholder="Write comment"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
              <Btn onClick={() => {}}>수정하기</Btn>
            </form>
          </div>
        )}
        <WriteDate>{formDate(item.modifiedDate)} </WriteDate>
      </CommentItem>
      {user?.name === item.writer && (
        <EditWrapper>
          <span onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? "취소" : "수정"}
          </span>
          <span onClick={() => handleDeleteComment(item.id)}>삭제</span>
        </EditWrapper>
      )}
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

  border-bottom: 1px solid #d3d3d3;
`;

const CommentItem = styled.div`
  width: 55vw;

  color: black;
`;

const Writer = styled.span`
  margin-right: 1rem;

  font-weight: 600;
`;

const WriteDate = styled.p`
  color: ${({ theme }) => theme.color.hover};

  font-size: small;
`;

const EditWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: 5rem;

  > span {
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.color.hover};
    }
  }
`;
