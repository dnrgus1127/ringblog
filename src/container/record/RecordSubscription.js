import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Error from "../../components/common/Error/Error";
import Loading from "../../components/common/Loading";
import RecordSubscriptionBlock from "../../components/record/RecordSubscriptionBlock";

export default function RecordSubscription() {
  const { loggedUser, loggedIn } = useSelector((state) => state.login);

  const { data, isLoading } = useQuery(
    ["loadSubscribed", loggedUser.userId],
    async () => {
      const response = await fetch(`/subscribed?userId=${loggedUser.userId}`);
      const result = await response.json();

      return result;
    },
    {
      enabled: loggedIn,
      staleTime: 60000,
    }
  );
  if (!loggedIn) return <Error text='로그인이 필요합니다.' />;

  if (isLoading) return <Loading />;
  return (
    <div>
      {data.map((item, idx) => (
        <RecordSubscriptionBlock key={idx} userId={item.subscribedUser} />
      ))}
    </div>
  );
}
