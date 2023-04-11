import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function useRcmndList() {
  const { loggedUser } = useSelector((state) => state.login);
  const {
    data: rcmndPostList,
    isLoading: rcmndListLoading,
    isError,
  } = useQuery(
    ["rcmndPostList", loggedUser.userId],
    async () => {
      const response = await fetch(
        `/rcmnd/RcmndedPosts?userId=${loggedUser.userId}`
      );

      return response.json();
    },
    {
      staleTime: 5000,
    }
  );

  return { rcmndPostList, isError, rcmndListLoading };
}
