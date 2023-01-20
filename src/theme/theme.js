const theme = {};

const lightTheme = {
  color: "black",
  oppositeColor: "white",
  bgElement: "#ffffff",
  bgColor: "#F8F9FA",
  greyColor: "#868e96",
  lineColor: "lightgrey",
  borderColor: "rgb(192,192,192)",
  mdColor: "#f8fdfc",
  ...theme,
};

const darkTheme = {
  color: "white",
  oppositeColor: "black",
  bgElement: "#1e1e1e",
  bgColor: "#121212",
  greyColor: "#b6bec6",
  lineColor: "#2e2e2e",
  borderColor: "rgb(64,64,64)",
  mdColor: "#0c0c0c",
  ...theme,
};

export { lightTheme, darkTheme };
