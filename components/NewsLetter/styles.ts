import { css } from "@emotion/react";
import { colors, typography, utils } from "../../styles1";

export const subscribe = css({
  textAlign: "center",
  justifyContent: "space-between",
  // background: "#52B58812",
  margin: "0px -100px",
  padding: `${utils.remConverter(30)} ${utils.remConverter(100)}`,
});

export const featureSubHeading = css({
  ...typography.B3_16_semibold,
  color: colors.Zeb_Solid_Dark_Grey,
});

export const benefitHeading = css({
  ...typography.H4_28_bold,
  color: colors.Zeb_Solid_Dark,
});
