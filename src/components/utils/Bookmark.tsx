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
