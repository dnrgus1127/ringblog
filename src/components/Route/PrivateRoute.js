import React from "react";
import ErrorPage from "../../Pages/ErrorPage";

export default function PrivateRoute({ element, auth }) {
  return auth ? element : <ErrorPage errorCode={403} />;
}
