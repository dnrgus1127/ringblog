// 일반,다크모드 공통 색상 속성
const theme = {
  btnColor: "#96f2d7",
  btnHover: "#63E6BE",
};

// 일반 모드 색상
const lightTheme = {
  color: "black",
  oppositeColor: "white",
  bgElement: "#ffffff",
  bgElement2: "#ffffff",
  bgElement3: "#252525",
  bgColor: "#F8F9FA",
  greyColor: "#868e96",
  lineColor: "lightgrey",
  borderColor: "rgb(192,192,192)",
  mdColor: "#f8fdfc",
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
  ...theme,
};

export { lightTheme, darkTheme };
