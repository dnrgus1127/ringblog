export const mediaQuery = (maxWidth) => `
  @media (max-width: ${maxWidth}px)
`;

const media = {
  xxlarge: mediaQuery(1920),
  xlarge: mediaQuery(1400),
  large: mediaQuery(1100),
  medium: mediaQuery(832),
  small: mediaQuery(640),
  xsmall: mediaQuery(375),
  custom: mediaQuery,
};

export default media;
