import { del, get, instance, post } from "@/libs/api";
import { queryKeys } from "@/react-query/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { COMMENT } from "@/types";
import customAlert from "@/components/modal/CustomModalAlert";
const getComment = async (postId: number, page: number) => {
  const res = await get(`/api/comment/${postId}/page/${page}`).then(
    (res: any) => res.data
  );
  return res;
};

const postComment = async ({
  postId,
  newComment,
}: {
  postId: number;
  newComment: string;
}): Promise<any> => {
  const res = await post(`/api/comment/new`, {
    postId,
    context: newComment,
  }).then((res: any) => res);

  return { res, postId };
};

const updateComment = async ({
  postId,
  commentId,
  editComment,
}: {
  postId: number;
  commentId: number;
  editComment: string;
}) => {
  const res = await instance.patch(
    `/api/comment/${postId}/comment/${commentId}`,
    {
      context: editComment,
    }
  );

  return { res, postId };
};

const deleteComment = async ({
  postId,
  commentId,
}: {
  postId: number;
  commentId: number;
}) => {
  const res = await del(`/api/comment/${commentId}`);

  return { res, postId };
};
const useComment = (postId: number) => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  useEffect(() => {
    // assume increment of one month
    queryClient.prefetchQuery([queryKeys.comment, postId, page + 1], () =>
      getComment(postId, page + 1)
    );
  }, [page]);

  const fallback: COMMENT[] = [];
  const { data = fallback } = useQuery(
    [queryKeys.comment, postId, page],
    () => getComment(postId, page),
    {
      refetchInterval: 60000, //1분마다 리페치
    }
  );
  return { data, page, setPage };
};

const usePostComment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (commentRequest: { postId: number; newComment: string }) =>
      postComment(commentRequest),
    {
      onSuccess: ({ res, postId }) => {
        // queryClient.invalidateQueries();
        queryClient.invalidateQueries([queryKeys.comment, postId]);
        // queryClient.removeQueries([queryKeys.detail]);
        // queryClient.removeQueries([queryKeys.member]);

        customAlert("글이 작성되었습니다.");
      },
      onError: () => {
        customAlert("오류발생");
      },
    }
  );
  return mutate;
};
const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (commentRequest: {
      postId: number;
      commentId: number;
      editComment: string;
    }) => updateComment(commentRequest),
    {
      onSuccess: ({ postId }: { postId: number }) => {
        queryClient.invalidateQueries([queryKeys.comment, postId]);

        customAlert("댓글이 수정되었습니다.");
      },
      onError: () => {
        customAlert("오류발생");
      },
    }
  );
  return mutate;
};
const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (commentRequest: { postId: number; commentId: number }) =>
      deleteComment(commentRequest),
    {
      onSuccess: ({ postId }: { postId: number }) => {
        queryClient.invalidateQueries([queryKeys.comment, postId]);
        customAlert("댓글이 삭제되었습니다.");
      },
      onError: () => {
        customAlert("오류발생");
      },
    }
  );
  return mutate;
};

export { useComment, usePostComment, useUpdateComment, useDeleteComment };
