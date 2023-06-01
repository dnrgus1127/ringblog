// 일반,다크모드 공통 색상 속성
const theme = {
  tmp: "#FF5F9E",
  btnColor2: "#2ea043",
};

// 일반 모드 색상
const lightTheme = {
  color: "black",
  oppositeColor: "white",
  bgElement: "rgb(242, 243, 234)",
  bgElement2: "rgb(242, 243, 234)",
  // bgElement: "#ffffff",
  // bgElement2: "#ffffff",
  bgElement3: "#f8f9fa",
  // bgColor: "#F8F9FA",
  bgColor: "rgb(242, 243, 234)",

  greyColor: "#868e96",
  greyText: "#acacac",
  lineColor: "lightgrey",
  borderColor: "rgb(192,192,192)",
  mdColor: "#f8fdfc",
  tableColor: "#A0A0A0", //임시
  btnColor: "rgb(24, 24, 24)",
  btnHover: "rgb(0, 0, 0)",
  // btnColor: "#12B886",
  // btnHover: "#20C997",
  warning: "rgba(236, 130, 03, 0.9)",

  codeColor: "#e9ecef",
  preColor: "#f6f6f6",
  pointColor: "rgb(16,16,16)",
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
  // btnColor: "#96f2d7",
  btnColor: "#736ac1",
  btnHover: "#A084CA",
  // btnHover: "#63E6BE",
  pointColor: "#736ac1",
  warning: "rgba(256, 150, 23, 0.9)",
  codeColor: "#363636",
  preColor: "#1c1b1b",
  ...theme,
};

export { lightTheme, darkTheme };
