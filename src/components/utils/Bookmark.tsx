import { del, post } from "@/libs/api";
import React, { useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import styled from "styled-components";
import { useDeleteBookmark, usePostBookmark } from "@/hooks/main/bookmark";

const Bookmark = ({
  isMarked,
  postId,
}: {
  isMarked: boolean;
  postId: number;
}) => {
  const postBookmark = usePostBookmark();
  const deleteBookmark = useDeleteBookmark();

  const handleBookmark = async () => {
    if (!isMarked) {
      postBookmark(postId);
    } else {
      deleteBookmark(postId);
    }
  };

  useEffect(() => {}, [isMarked]);

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
