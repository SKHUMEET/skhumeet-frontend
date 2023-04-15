import customAlert from "@/components/modal/CustomModalAlert";
import { QueryClient } from "@tanstack/react-query";

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = "react-query-error";
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  // prevent duplicate toasts
  customAlert("react-query-error");
}

// to satisfy typescript until this file has uncommented contents

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,

      staleTime: 60000, // 캐시데이터를 유효하게 유지 (ms). 이 시간이 지나면 해당 데이터가 유효하지 않은 것으로 간주되어, 다시 서버에 요청.
      cacheTime: 900000, // 캐시된 데이터가 유효한 시간. 이 시간이 지나면 캐시된 데이터를 삭제
      // refetchInterval:10000,//10sec. 주기적으로 다시 가져오는 간격
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
