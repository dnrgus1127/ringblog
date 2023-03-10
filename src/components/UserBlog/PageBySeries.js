import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { Context } from "../../functions/Login/LoginProvider";
import Error from "../common/Error/Error";
import { Fetch } from "../Fetch";
import SeriesList from "./SeriesList";

export default function PageBySeries() {
  const { loggedUser, loggedIn } = useContext(Context);
  const [reFetch, setReFetch] = useState();
  const forceUpdate = useCallback(() => setReFetch({}), []);

  function loadList({ data }) {
    return <SeriesList data={data} refresh={forceUpdate} />;
  }

  if (!loggedIn) return <Error text={"로그인이 필요합니다."} />;
  return (
    <div>
      <Fetch
        uri={`/series/byUser?userId=${loggedUser.userId}`}
        renderSuccess={loadList}
        options={reFetch}
      />
    </div>
  );
}
