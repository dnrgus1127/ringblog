import React from "react";
import { useQuery } from "react-query";
import MainPagePostSlide from "../../components/mainPage/MainPagePostSlide";

export default function MainPagePostSlideContainer() {
  const { data } = useQuery(["tempPost"], async () => {
    const response = await fetch("/posts/198");
    const result = await response.json();
    console.log(result);
    return result;
  });

  return <MainPagePostSlide data={data} />;
}
