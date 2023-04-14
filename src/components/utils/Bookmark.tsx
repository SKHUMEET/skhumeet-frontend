import { del, post } from "@/libs/api";
import React, { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import styled from "styled-components";
import customAlert from "../modal/CustomModalAlert";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { queryKeys } from "@/react-query/constants";
import { getPostById } from "@/hooks/main";
import { useDeleteBookmark, usePostBookmark } from "@/hooks/main/bookmark";

const Bookmark = ({
  isMarked,
  postId,
}: {
  isMarked: boolean;
  postId: number;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isMarked);
  const postBookmark = usePostBookmark();
  const deleteBookmark = useDeleteBookmark();
  //todo: 북마크시 쿼리 수정
  const handleBookmark = async () => {
    if (!isBookmarked) {
      postBookmark(postId);
      setIsBookmarked(true);
    } else {
      deleteBookmark(postId);
      setIsBookmarked(false);
    }
  };

  useEffect(() => {
    console.log("im", isBookmarked);
  }, [isBookmarked]);

  return (
    <BookmarkWrapper onClick={handleBookmark}>
      {isBookmarked ? <BsBookmarkFill color="#69b030" /> : <BsBookmark />}
    </BookmarkWrapper>
  );
};

export default Bookmark;

const BookmarkWrapper = styled.div`
  cursor: pointer;
`;
