// 일반,다크모드 공통 색상 속성
const theme = {
  tmp: "#FF5F9E",
};

// 일반 모드 색상
const lightTheme = {
  color: "black",
  oppositeColor: "white",
  bgElement: "#ffffff",
  bgElement2: "#ffffff",
  bgElement3: "#ffffff",
  bgColor: "#F8F9FA",
  greyColor: "#868e96",
  lineColor: "lightgrey",
  borderColor: "rgb(192,192,192)",
  mdColor: "#f8fdfc",
  tableColor: "#A0A0A0", //임시
  btnColor: "#12B886",
  btnHover: "#20C997",
  warning: "rgba(236, 130, 03, 0.9)",

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
  lineColor: "#2e2e2e",
  borderColor: "rgb(64,64,64)",
  mdColor: "#0c0c0c",
  tableColor: "#A0A0A0",
  btnColor: "#96f2d7",
  btnHover: "#63E6BE",
  warning: "rgba(256, 150, 23, 0.9)",
  ...theme,
};

export { lightTheme, darkTheme };
