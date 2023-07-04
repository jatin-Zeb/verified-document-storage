import { css } from "@emotion/react";
import { colors, typography, utils } from "../../styles1";

export const header = (gap: boolean) => {
  return css({
    width: "100%",
    height: utils.remConverter(72),
    display: "flex",
    justifyContent: "space-between",
    background: "#8bdbf22b",
    padding: `${utils.remConverter(20)} ${utils.remConverter(gap ? 100 : 20)}`,
  });
};

export const webName = css({
  ...typography.B2_20_regular,
  textDecoration: "none",
  color: "#444444",
  marginLeft: "-20px",
});

export const topBar = css({
  display: "flex",
  alignItems: "center",
  gap: utils.remConverter(30),
});

export const subHeading = (show: boolean = true) => {
  return css({
    pointerEvents: show ? "inherit" : "none",
    textDecoration: "none",
    textTransform: "uppercase",
    cursor: "pointer",
    opacity: show ? "1" : "0.4",
    color: colors.Zeb_Solid_Very_Dark_Grey_Blue,
    marginLeft: utils.remConverter(16),
    display: "inline-block",
    position: "relative",
    padding: "10px 20px",
    transitionProperty: "color , opacity , background",
    transitionDuration: "0.2s",
    msTransitionProperty: "linear",
    borderRadius: "8px",

    "&:hover": {
      background: colors.Zeb_Transparent_Yellow_01,
    },
  });
};

export const buttonStyle = css({
  ...typography.C3_14,
  color: colors.Zeb_Solid_White,
  fontWeight: "800",
  textTransform: "none",
  width: "140px",
  backgroundColor: colors.Zeb_Solid_Bright_Blue,
  borderRadius: utils.remConverter(8),
  padding: utils.remConverter(4),

  position: "relative",
});

export const loginStatus = css({
  display: "flex",
  alignItems: "center",
  gap: utils.remConverter(8),
});

export const loginButton = css({
  backgroundColor: "white",
  position: "absolute",
  top: 0,
  opacity: 0,
  color: "black",
  border: "none",
  outline: "none",
  width: "140px !important",
  maxWidth: "140px !important",
  height: "32px !important",
  padding: utils.remConverter(4),
  overflow: "hidden",
  button: {
    width: "140px !important",
  },
});

export const address = css({
  position: "relative",
  color: "black",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});
export const signout = css({
  position: "fixed",
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  zIndex: 99,
});

export const signoutContainer = css({
  position: "absolute",
  top: "40px",
});

export const selectOverlay = css({
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: "9",
});

export const loginOptionContainer = css({
  display: "flex",
  borderRadius: "50px",
  margin: "15px",
  border: "1px solid rgba(0,0,0,0.25)",
  padding: utils.remConverter(10),
  position: "relative",
  cursor: "pointer",
});

export const loginImg = css({
  position: "absolute",
});

export const loginTitle = css({
  flex: "1",
  display: "flex",
  justifyContent: "center",
});

export const walletAddress = css({
  fontSize: 14,
});

export const optionIcon = css({
  fontSize: "18px",
  color: "#000000",
  margin: "5px 0px",
  cursor: "pointer",
  marginRight: "5px",
});
