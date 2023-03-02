import React from "react";

import styled from "styled-components";
import { ColorButton } from "../../Button";
import useSubscription from "../../common/Subscription/hook/useSubscription";

const Button = styled(ColorButton)`
  margin: 0;
  font-size: 1.6rem;
  ${(props) => (props.sub ? { backgroundColor: "grey" } : null)}

  &:hover {
    ${(props) => (props.sub ? { backgroundColor: "grey" } : null)}
  }
`;

export default function SubscriptionButton({ writer }) {
  const { sub, subscribe, unSubscribe } = useSubscription(writer);
  return (
    <Button
      sub={sub}
      onClick={() => {
        sub ? unSubscribe() : subscribe();
      }}
    >
      {sub ? "구독 그만할래요 " : "이 글쓴이 구독하기"}
    </Button>
  );
}
