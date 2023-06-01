import React from "react";
import { useQuery } from "react-query";
import MainPagePostSlider from "../../components/mainPage/MainPagePostSlider";

export default function MainPagePostSliderContainer() {
  const { data } = useQuery(["tempPost"], async () => {
    const response = await fetch("/posts/198");
    const result = await response.json();
    console.log(result);
    return result;
  });

  return <MainPagePostSlider data={data} />;
}
