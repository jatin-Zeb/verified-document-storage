import { css } from "@emotion/react";
import { utils, colors, typography } from "../../../../styles1";

export const cameraAndBtn = css({
  // width: "80%",
  height: "50%",
  margin: "auto",
  video: {
    maxHeight: "200px",
    maxWidth: "-webkit-fill-available",
    borderRadius: 8
  },
  textAlign: "center"
});

export const cropContainer = css({
  height: "100%",
  "div:first-child": {
    height: "100%"
  }
});

export const captureBtn = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  marginTop: utils.remConverter(40),
  backgroundColor: colors.Zeb_Solid_White,
  img: {
    marginRight: utils.remConverter(8),
  }
});

export const capturedImageContainer = css({
  height: "100%",
  overflow: "hidden",
  background: colors.Zeb_Solid_Dark_Blue,
  borderRadius: "0.5rem",
  padding: `${utils.remConverter(32)} ${utils.remConverter(24)}`
});

export const loadedFile = css({
  display: "flex",
  marginBottom: utils.remConverter(28)
});

export const tick = css({
  width: utils.remConverter(52),
  height: utils.remConverter(52),
  background: colors.Zeb_Solid_Green,
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: utils.remConverter(20),
  color: colors.Zeb_Solid_White
});

export const loadedFileHeading = css({
  ...typography.H6_16_bold
});

export const loadedFileReplace = css({
  ...typography.C3_14,
  color: colors.Zeb_Solid_Bright_Blue,
  cursor: "pointer",
  textAlign: "left"
});

export const capturedImage = css({
  width: "100%",
  maxWidth: 300
});

export const croppedPreview = css({
  // visibility: "hidden",
  display: "none"
});

export const noCam = css({
  alignSelf: "center",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  ...typography.C3_14
});

export const what = css({
  width: "40%",
  position: "relative",
  margin: "auto"
});

export const icon = css({
  fontSize: "20px",
  marginRight: "8px"
});
