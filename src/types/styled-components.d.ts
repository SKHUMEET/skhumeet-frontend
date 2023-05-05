import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      small: string;
      medium: string;
      large: string;
    };
    color: {
      text: string;
      lightText: string;
      background: string;
      hover: string;
      light: string;
      main: string;
      // sub: string;
      // point: string;
    };
  }
}
