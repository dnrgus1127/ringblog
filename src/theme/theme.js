// 일반,다크모드 공통 색상 속성
const theme = {
  tmp: "#FF5F9E",
  btnColor2: "#2ea043",
};

// 일반 모드 색상
const lightTheme = {
  color: "black",
  oppositeColor: "white",
  bgElement: "rgb(255, 255, 255)",
  bgElement2: "rgb(255, 255, 255)",
  bgElement3: "rgb(248, 249, 250)",
  bgColor: "rgb(255, 255, 255)",

  greyColor: "#868e96",
  greyText: "#acacac",
  lineColor: "lightgrey",
  borderColor: "rgb(192,192,192)",
  mdColor: "#f8fdfc",
  tableColor: "#A0A0A0", //임시
  btnColor: "#606C5D",
  btnHover: "rgb(0, 0, 0)",

  warning: "rgba(236, 130, 03, 0.9)",

  codeColor: "#e9ecef",
  preColor: "#f6f6f6",
  pointColor: "#4A55A2",
  ...theme,
};

// 다크모드 적용 시 색상
const darkTheme = {
  color: "white",
  oppositeColor: "black",
  bgElement: "#1e1e1e",
  bgElement2: "#2e2e2e",
  bgElement3: "#252525",
  bgColor: "#121212",
  greyColor: "#b6bec6",
  greyText: "#acacac",
  lineColor: "#2e2e2e",
  borderColor: "rgb(64,64,64)",
  mdColor: "#0c0c0c",
  tableColor: "#A0A0A0",
  btnColor: "#736ac1",
  btnHover: "#A084CA",
  pointColor: "#736ac1",
  warning: "rgba(256, 150, 23, 0.9)",
  codeColor: "#363636",
  preColor: "#1c1b1b",
  ...theme,
};

export { lightTheme, darkTheme };
