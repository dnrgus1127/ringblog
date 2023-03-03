import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import SubPostPreview from "./SubPostPreview";
import SubUserInfo from "./SubUserInfo";

const Container = styled.div`
  .subItem {
    margin-bottom: 2rem;
  }
`;

export default function RecordSubscription() {
  const [subscribed, setSubscribed] = useState([]);

  useEffect(() => {
    fetch(`/subscribed`)
      .then((res) => res.json())
      .then((data) => setSubscribed(data));
  }, []);

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
