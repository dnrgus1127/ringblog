export const shadowString = (size, opacity = 0.1) => `
    box-shadow: 0px 0px ${size}px rgba(0,0,0,${opacity})
`;

const shadow = {
  large: shadowString(15),
  medium: shadowString(10),
  small: shadowString(5),
  custom: shadowString,
};

export default shadow;
