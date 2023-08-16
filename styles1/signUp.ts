import { css, keyframes } from "@emotion/react";
import utils from "./utils";

const show = keyframes({
  "0%": {
    opacity: 0,
    zIndex: 1,
  },
  "100%": {
    opacity: 1,
    zIndex: 5,
  },
});
export const container = css({
  position: "absolute",
  width: "60%",
  height: "65%",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
  top: "15%",
  left: "25%",
  overflow: "hidden",
});

export const formContainer = css({
  padding: "24px",
  position: "absolute",
  top: "0",
  height: "100%",
  transition: "all 0.6s ease-in-out",
});
export const signUpContainer = css({
  left: 0,
  width: "50%",
  opacity: 0,
  zIndex: 1,
});
export const loginContainer = css({
  left: "0",
  width: "50%",
  zIndex: 2,
  opacity: 1,
});

export const rightPanelActiveSignUp = css({
  transform: "translateX(100%)",
  opacity: 1,
  zIndex: 5,
  animation: `${show} 0.6s`,
});
export const leftPanelActiveLogin = css({
  transform: "translateX(100%)",
});
export const overlayRightPanelActive = css({
  transform: "translateX(-100%)",
});
export const overlayContainer = css({
  position: "absolute",
  top: "0",
  left: "50%",
  width: "50%",
  // height: "100%",
  overflow: "hidden",
  transition: "transform 0.6s ease-in-out",
  zIndex: 100,
});
export const overlay = css({
  background: "linear-gradient(to right, #FF4B2B, #FF416C)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "0 0",
  color: "#FFFFFF",
  transform: "translateX(0)",
  transition: "transform 0.6s ease-in-out",
  position: "relative",
  left: "-100%",
  height: "65vh",
  width: "200%",
});
export const rightPanelActiveOverlay = css({
  transform: "translateX(50%)",
});

export const overlayLeft = css({
  transform: "translateX(-20%)",
});
export const overlayLogin = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 40px",
  textAlign: "center",
  top: "0",
  height: "100%",
  width: "50%",
  transform: "translateX(0)",
  transition: "transform 0.6s ease-in-out",
});

export const overlayRight = css({
  right: 0,
  transform: "translateX(0)",
});

export const overlayPanel = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 40px",
  textAlign: "center",
  top: "0",
  height: "100%",
  width: "50%",
  transform: "translateX(0)",
  transition: "transform 0.6s ease-in-out",
});
export const overlaySignUp = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 40px",
  textAlign: "center",
  top: "0",
  height: "100%",
  width: "50%",
  transform: "translateX(0)",
  transition: "transform 0.6s ease-in-out",
});

export const loginOptionContainer = css({
  // display: "flex",
  borderRadius: "50px",
  // margin: "15px",
  border: "1px solid rgba(0,0,0,0.25)",
  padding: utils.remConverter(10),
  position: "relative",
  cursor: "pointer",
  height: "42px",
});

export const loginImg = css({
  // position: "absolute",
  width: "20px",
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
