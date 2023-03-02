import { css } from "@emotion/react";
import { colors, mixins, typography } from "../../../styles1";

export const userDocuments = css({
  width: "80%",
  border: `0.5px solid ${colors.Zeb_Border_Grey}`,
  borderRadius: "30px",
  height: "85vh",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  padding: "25px 45px",
});

export const heading = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const tab1Container = css({
  display: "flex",
  gap: "50px",
});

export const personal = css({
  flex: 1,
  boxShadow: "1px 1px 1px 1px #B0B0B0",
  minHeight: "300px",
  borderRadius: "8px",
  padding: "20px 36px",
});

export const financial = css({
  flex: 1,
  boxShadow: "1px 1px 1px 1px #B0B0B0",
  minHeight: "300px",
  borderRadius: "8px",
  padding: "20px 36px",
});

export const header = css({
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "600",
  color: "#444444",
  textDecoration: "underline",
});

export const component = css({
  display: "flex",
});

export const info = css({
  marginBottom: "10px",
});

export const infoHead = css({});
export const infoSubHead = css({
  fontWeight: "600",
  color: "#444444",
});

export const uploadKyc = css({
  ...typography.B5_14_semibold,
  margin: "16px 0px",
  marginTop: "-4px",
  padding: "8px 10px",
  background: colors.Zeb_BG_Light_Blue,
  borderRadius: "20px",
  color: colors.Zeb_Solid_Blue,
  cursor: "pointer",
  border: `1px solid ${colors.Zeb_BG_Light_Blue} `,
});
