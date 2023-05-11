import { colors, utils, typography, mixins } from "../../styles1";
import { css } from "@emotion/react";

export const landingContainer = css({
  height: "100%",
  background: "white",
  // backgroundImage: `linear-gradient(90deg, rgba(48,118,224,1) 0%, rgba(249,249,249,1) 1%, rgba(230,230,230,1) 99%, rgba(48,118,224,1) 100%)`,
});

export const body = css({
  height: "calc(100vh - 72px)",
  display: "flex",
  padding: "20px 100px",
});

export const getStarted = css({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: utils.remConverter(20),
});

export const getStartedButton = css({
  textTransform: "none",
  padding: `${utils.remConverter(8)} ${utils.remConverter(40)}`,
  backgroundColor: "white",
  color: "#444444",
  borderRadius: utils.remConverter(8),
  textDecoration: "underline",
});

export const getStartedText = css({
  fontSize: utils.remConverter(36),
  maxWidth: utils.remConverter(480),
  fontStyle: "italic",
  textAlign: "center",
});

export const icon = css({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  img: {
    maxWidth: utils.remConverter(300),
    maxHeight: utils.remConverter(300),
  },
});

export const feature = css({
  ...typography.H5_20_regular,
  display: "contents",
  flexDirection: "row",
  margin: "0px 10px",
  "::after": {
    content: `""`,
    flex: "1 1",
    borderBottom: "1px solid",
    margin: "auto",
    marginLeft: "10px",
  },
  "::before": {
    content: `""`,
    flex: "1 1",
    borderBottom: "1px solid",
    margin: "auto",
    marginRight: "10px",
  },
});

export const heading = css({
  ...typography.H1_56_bold,
  width: "60%",
  color: colors.Zeb_Solid_Dark,
});

export const subHeading = css({
  ...typography.H5_20_semibold,
  color: colors.Zeb_Solid_Dark_Grey,
});

export const main = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#52B58812",
  margin: "0px -100px",
  padding: "40px 100px",
});

export const subContent = css({});

export const subContentHeading = css({
  ...typography.H2_44_bold,
  color: colors.Zeb_Solid_Dark,
});

export const featureHeading = css({
  ...typography.H5_20_bold,
  color: colors.Zeb_Solid_Dark,
});

export const featureSubHeading = css({
  ...typography.B3_16_semibold,
  color: colors.Zeb_Solid_Dark_Grey,
});
