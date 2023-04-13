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
    <Container
      style={{ marginBottom: "1rem" }}
      key={(item.id, item.writer, item.context, item.modifiedDate)}
    >
      <CommentItem key={item.id}>
        <Writer>{item.writer}</Writer>

        {!isEdit ? (
          <span>{item.context} </span>
        ) : (
          <CommentContainer onSubmit={handlePatchComment}>
            <CommentInput
              placeholder="Write comment"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
            <Btn onClick={() => {}}>수정하기</Btn>
          </CommentContainer>
        )}

        <WriteDate>{formDate(item.modifiedDate)} </WriteDate>
        {user?.name === item.writer && (
          <>
            <div onClick={() => setIsEdit(!isEdit)}>
              {isEdit ? "취소" : "수정"}
            </div>
            <div onClick={() => handleDeleteComment(item.id)}>삭제</div>
          </>
        )}
        <div></div>
      </CommentItem>
      {/* <TimeContainer style={{ paddingLeft: "0" }}>
    <DateP style={{ color: "#8e8e8e", marginBottom: "5px" }}>
      {formatDate(el.modifiedDate)}
    </DateP>
  </TimeContainer>{" "} */}
    </Container>
  );
};

export default CommentDetail;

const TimeContainer = styled.div`
  float: left;
  padding-top: 5px;
  padding-left: 10px;
`;

const Container = styled.div`
  border-bottom: 1px solid #d3d3d3;
`;

const CommentItem = styled.div`
  width: 55vw;
  padding: 1rem;

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
function patch(arg0: string, arg1: { postId: number; context: any }) {
  throw new Error("Function not implemented.");
}
