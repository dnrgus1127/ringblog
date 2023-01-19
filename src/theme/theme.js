const theme = {};

const lightTheme = {
  color: "black",
  oppositeColor: "white",
  bgElement: "#ffffff",
  bgColor: "#F8F9FA",
  greyColor: "#868e96",
  lineColor: "lightgrey",
  borderColor: "rgb(192,192,192)",
  ...theme,
};

const darkTheme = {
  color: "white",
  oppositeColor: "black",
  bgElement: "#1e1e1e",
  bgColor: "#121212",
  greyColor: "lightgrey",
  lineColor: "#2e2e2e",
  borderColor: "rgb(64,64,64)",
  ...theme,
};

export { lightTheme, darkTheme };
