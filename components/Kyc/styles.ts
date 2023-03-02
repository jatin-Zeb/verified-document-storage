import { css } from "@emotion/react";
import { colors, typography } from "../../styles1";

export const addKyc = css({
  boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
  padding: "1px 40px 36px 40px",
  borderRadius: "12px",
  border: `1px solid ${colors.Zeb_Soild_LightGrey}`,
  minHeight: "80%",
});

export const kycStep = css({
  border: `1px solid ${colors.Zeb_Soild_LightGrey}`,
  width: "100%",
  padding: "1px 33px",
  borderRadius: "10px",
});

export const kycComplete = css({
  background: colors.Zeb_Solid_White,
  padding: "15%",
  paddingBottom: "20px",
  textAlign: "center",
  display: "grid",
  justifyItems: "center",
  borderRadius: "8px",
  ...typography.B4_14_semibold,
});
export const heading = css({
  ...typography.H6_16_bold,
  marginRight: "10px",
  width: "15%",
});
