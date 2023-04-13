import { get } from "@/libs/api";
import { queryKeys } from "@/react-query/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const commonOptions = {
  staleTime: 0,
  cacheTime: 300000, // 5 minutes
};

const getMemberPost = async (page: number) => {
  const res = await get(`/api/post/member?page=${page}`).then(
    (r: any) => r.data
  );
  console.log("15", res);

  return res;
};

const getMemberLikePost = async (page: number) => {
  const res = await get(`/api/post/bookmark?page=${page}`).then(
    (r: any) => r.data
  );
  console.log("23", res);

  return res.data;
};
export const useMemberPost = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  useEffect(() => {
    // assume increment of one month
    queryClient.prefetchQuery(
      [queryKeys.member, page + 1],
      () => getMemberPost(page),
      commonOptions
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
    queryClient.prefetchQuery(
      [`${queryKeys.member}like`, page + 1],
      () => getMemberLikePost(page),
      commonOptions
    );
  }, [page]);

  const fallback = {};

  const { data = fallback } = useQuery([`${queryKeys.member}like`, page], () =>
    getMemberLikePost(page)
  );
  return { data, page, setPage };
};
