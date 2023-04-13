import { del, post } from "@/libs/api";
import React from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import styled from "styled-components";
import customAlert from "../modal/CustomModalAlert";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const Bookmark = ({
  isMarked,
  postId,
}: {
  isMarked: boolean;
  postId: number;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleBookmark = async () => {
    if (!isMarked) {
      await post(`/api/post/bookmark?postId=${postId}`).then((res) => {
        // customAlert("북마크 생성");
        queryClient.clear();
        router.reload();
      });
    } else {
      await del(`/api/post/bookmark?postId=${postId}`).then((res) => {
        // customAlert("북마크 해제");
        queryClient.clear();
        router.reload();
      });
    }
  };

  return (
    <BookmarkWrapper onClick={handleBookmark}>
      {isMarked ? <BsBookmarkFill color="#69b030" /> : <BsBookmark />}
    </BookmarkWrapper>
  );
};

export default Bookmark;

const BookmarkWrapper = styled.div`
  cursor: pointer;
`;
