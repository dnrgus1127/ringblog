import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Error from "../../common/Error/Error";
import SubPostPreview from "./SubPostPreview";
import SubUserInfo from "./SubUserInfo";

const Container = styled.div`
  .subItem {
    margin-bottom: 2rem;
  }
`;

export default function RecordSubscription() {
  const [subscribed, setSubscribed] = useState([]);
  const { loggedUser, loggedIn } = useSelector((state) => state.login);

  useEffect(() => {
    if (!loggedIn) return;
    fetch(`/subscribed?userId=${loggedUser.userId}`)
      .then((res) => res.json())
      .then((data) => setSubscribed(data));
  }, [loggedUser, loggedIn]);

  if (!loggedIn) return <Error text={"로그인이 필요합니다."} />;

  return (
    <Container>
      {subscribed.map((item, idx) => (
        <div className='subItem' key={idx}>
          <SubUserInfo userId={item.subscribedUser} />
          <SubPostPreview user={item.subscribedUser} />
        </div>
      ))}
    </Container>
  );
}
