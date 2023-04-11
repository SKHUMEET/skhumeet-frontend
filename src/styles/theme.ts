// 768px 이하: xs를 span으로 적용
// 992px 이하: sm을 span으로 적용
// 1200px 이하: md를 span으로 적용
// 1200px 이상: lg를 span으로 적용

export const lightTheme = {
  breakpoints: {
    small: "768px",
    medium: "992px",
    large: "1200px",
  },
  color: {
    text: "#202124",
    background: "#fefefe",
    hover: "#c6c6c6",
    light: "#68bd3081",
    main: "#69b030",
  },
};
export const darkTheme = {
  breakpoints: {
    small: "768px",
    medium: "992px",
    large: "1200px",
  },
  color: {
    text: "#fefefe",
    background: "#2b2b2b",
    hover: "#c6c6c6",
    light: "#68bd3081",
    main: "#69b030",
  },
};
