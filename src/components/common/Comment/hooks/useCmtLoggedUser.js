import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function useCmtLoggedUser() {
  const { loggedUser } = useSelector((state) => state.login);

  const { data, isLoading, isError, refetch } = useQuery(
    ["commentsWrittenUsers", loggedUser.userId],
    async () => {
      const response = await fetch(
        `/allCommentByUser?userId=${loggedUser.userId}`
      );
      return response.json();
    }
  );

  return { data, isLoading, isError, refetch };
}
