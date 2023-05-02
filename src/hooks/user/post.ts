import { get } from "@/libs/api";
import { queryKeys } from "@/react-query/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getMemberPost = async (page: number) => {
  const res = await get(`/api/post/member?page=${page}`).then(
    (r: any) => r.data
  );

  return res;
};

const getMemberLikePost = async (page: number) => {
  const res = await get(`/api/post/bookmark?page=${page}`).then(
    (r: any) => r.data
  );

  return res.data;
};
export const useMemberPost = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  useEffect(() => {
    // assume increment of one month
    queryClient.prefetchQuery([queryKeys.member, page + 1], () =>
      getMemberPost(page + 1)
    );
  }, [page]);

  const fallback = {};

  const { data = fallback } = useQuery([queryKeys.member, page], () =>
    getMemberPost(page)
  );
  return { data, page, setPage };
};

export const useMemberLikePost = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  useEffect(() => {
    // assume increment of one month
    queryClient.prefetchQuery([`${queryKeys.member}like`, page + 1], () =>
      getMemberLikePost(page + 1)
    );
  }, [page]);

  const fallback = {};

  const { data = fallback } = useQuery([`${queryKeys.member}like`, page], () =>
    getMemberLikePost(page)
  );
  return { data, page, setPage };
};
