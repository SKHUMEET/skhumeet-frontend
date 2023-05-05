import { del, post } from "@/libs/api";
import { queryKeys } from "@/react-query/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAlert from "@/components/modal/CustomModalAlert";

const postBookmark = async (postId: number): Promise<any> => {
  const res = await post(`/api/post/bookmark?postId=${postId}`);

  return { res, postId };
};
const deleteBookmark = async (postId: number): Promise<any> => {
  const res = await del(`/api/post/bookmark?postId=${postId}`);

  return { res, postId };
};

export const usePostBookmark = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation((postId: number) => postBookmark(postId), {
    onSuccess: ({ res, postId }: any) => {
      queryClient.invalidateQueries([queryKeys.detail, +postId]);

      customAlert("북마크가 설정되었습니다.");
    },
    onError: () => {
      customAlert("오류발생");
    },
  });
  return mutate;
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation((postId: number) => deleteBookmark(postId), {
    onSuccess: ({ postId }: { postId: number }) => {
      queryClient.invalidateQueries([queryKeys.detail, postId]);
      queryClient.invalidateQueries([`${queryKeys.member}like`]);
      customAlert("북마크가 해제되었습니다.");
    },
    onError: () => {
      customAlert("오류발생");
    },
  });
  return mutate;
};
