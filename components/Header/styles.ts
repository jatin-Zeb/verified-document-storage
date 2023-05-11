import { css } from "@emotion/react";
import { colors, typography, utils } from "../../styles1";

export const header = css({
  width: "100%",
  height: utils.remConverter(72),
  padding: utils.remConverter(20),
  display: "flex",
  justifyContent: "space-between",
  background: colors.Zeb_Solid_White,
});

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
    padding: "15px 20px",
    "&:hover": {
      color: "green",
      width: "100%",
      left: "0",
    },
    "::after": {
      // background: "none repeat scroll 0 0 transparent",
      bottom: "0",
      content: `""`,
      display: "block",
      height: "2px",
      left: "50%",
      position: "absolute",
      background: "#fff",
      transition: "width 0.3s ease 0s, left 0.3s ease 0s",
      width: "0",
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
