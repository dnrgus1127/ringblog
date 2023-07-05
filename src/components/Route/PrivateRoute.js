import React from "react";
import PageError from "../../Pages/PageError";

export default function PrivateRoute({ element, auth }) {
  return auth ? element : <PageError errorCode={403} />;
}
