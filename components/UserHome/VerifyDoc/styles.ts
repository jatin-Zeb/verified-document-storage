import { css } from "@emotion/react";
import { colors, typography } from "../../../styles1";

export const heading = css({
  ...typography.C4_16,
  color: colors.Zeb_Solid_Dark_Blue,
  marginBottom: "10px"
});

export const submitButton = css({
  display: "flex",
  justifyContent: "center"
})

export const participantHeading = css({
  width: "100%",
  textAlign: "left",
  fontSize: "16px",
  fontWeight: "500",
  marginBottom: "10px",
})

export const participantDetails = css({
  display: "grid",
  marginBottom: "5px",
})

export const name = css({
  gridRow: "1/2",
})

export const status = css({
  gridRow: "1/2",
})