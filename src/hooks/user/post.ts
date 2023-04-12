import { get } from "@/libs/api";
import { queryKeys } from "@/react-query/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const commonOptions = {
  staleTime: 0,
  cacheTime: 300000, // 5 minutes
};

const getMemberPost = async () => {
  const res = await get(`/api/post/member`).then((r: any) => r.data);

  return res;
};

export const useMemberPost = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  useEffect(() => {
    // assume increment of one month
    queryClient.prefetchQuery(
      [queryKeys.member, page + 1],
      getMemberPost,
      commonOptions
    );
  }, [page]);

  const fallback = {};
  const { data = fallback } = useQuery([queryKeys.member, page], getMemberPost);
  return { data, page, setPage };
};
