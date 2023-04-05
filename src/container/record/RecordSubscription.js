import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import RecordSubscriptionBlock from "../../components/record/RecordSubscriptionBlock";

export default function RecordSubscription() {
  const { userId } = useSelector((state) => state.login.loggedUser);

  const { data, isLoading } = useQuery(["loadSubscribed", userId], async () => {
    const response = await fetch(`/subscribed?userId=${userId}`);
    const result = await response.json();

    return result;
  });

  if (isLoading) return <Loading />;
  return (
    <div>
      {data.map((item, idx) => (
        <RecordSubscriptionBlock key={idx} userId={item.subscribedUser} />
      ))}
    </div>
  );
}
