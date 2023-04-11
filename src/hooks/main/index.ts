import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { get, post } from "@/libs/api";
import { Category, MAIN } from "@/types";

export const getMainCategory = async (category: Category, page: number) => {
  const res = await get(`/api/main/category/${category}?page=${page}`);
  return res;
};

export const postMain = async ({
  title,
  category,
  contact,
  endDate,
  view,
  context,
  images,
}: MAIN) => {
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
