import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get, post } from "@/libs/api";
import { Category, MAIN, MAINREQUEST } from "@/types";
import { queryKeys } from "@/react-query/constants";
import { useEffect, useState } from "react";
const commonOptions = {
  staleTime: 0,
  cacheTime: 300000, // 5 minutes
};
const getMainCategory = async (category: Category, page: number) => {
  const res = await get(`/api/main/category/${category}?page=${page}`).then(
    (r: any) => r.data
  );

  return res;
};

export const useMainCategory = (category: Category) => {
  const [page, setPage] = useState<number>(1);

  const queryClient = useQueryClient();
  useEffect(() => {
    // assume increment of one month
    queryClient.prefetchQuery(
      [queryKeys[category], page + 1],
      () => getMainCategory(category, page + 1),
      commonOptions
    );
  }, [page]);

  const fallback = {};
  const { data = fallback } = useQuery([queryKeys[category], page], () =>
    getMainCategory(category, page)
  );
  return { data, page, setPage };
};

export const usePrefetchMainCategory = (category: Category, page: number) => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(
    [queryKeys[category], page + 1],
    () => getMainCategory(category, page + 1),
    commonOptions
  );
};
export const postMain = async ({
  title,
  category,
  contact,
  endDate,
  view,
  context,
  images,
}: MAINREQUEST) => {
  await post("/api/main/new", {
    title,
    category,
    contact,
    endDate,
    view,
    context,
    images,
  });
};
