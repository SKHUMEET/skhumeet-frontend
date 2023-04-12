import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get, post } from "@/libs/api";
import { Category, MAIN, MAINREQUEST } from "@/types";
import { queryKeys } from "@/react-query/constants";
import { useEffect, useReducer, useState } from "react";
import customAlert from "@/components/modal/CustomModalAlert";
import { useRouter } from "next/router";

const commonOptions = {
  staleTime: 0,
  cacheTime: 300000, // 5 minutes
};
const getMainCategory = async (category: Category, page: number) => {
  const res = await get(`/api/post/category/${category}?page=${page}`).then(
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

const postMain = async ({
  title,
  category,
  contact = "email",
  status,
  endDate,
  view,
  context,
  images,
}: MAINREQUEST) => {
  const res = await post("/api/post/new", {
    title,
    category,
    contact,
    status,
    endDate: new Date(endDate),
    view,
    context,
    images,
  }).then((res: any) => {
    console.log("72", res);
    console.log("73", res.data);
    return res.data;
  });
  return res;
};

export const usePostMainCategory = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (mainRequest: MAINREQUEST) => postMain(mainRequest),
    {
      onSuccess: (data) => {
        console.log(data);
        console.log(data?.category);
        const category = data?.category.toLowerCase() as Category;

        console.log(category);
        queryClient.invalidateQueries([queryKeys[category]]);

        customAlert("글이 작성되었습니다.");
      },
      onError: () => {
        customAlert("오류발생");
      },
    }
  );
  return mutate;
};
