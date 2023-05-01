import { css } from "@emotion/react";
import { colors, mixins, typography } from "../../../styles1";

export const userDocuments = css({
  width: "100%",
  border: `0.5px solid ${colors.Zeb_Border_Grey}`,
  borderRadius: "30px",
  height: "85vh",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  padding: "25px 40px",
});

export const heading = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const contractCount = css({
  borderRadius: "10px",
  padding: "2px 7px",
  backgroundColor: "rgb(135, 206, 235, 0.5)"
});

export const participants = css({
  display: "grid"
});

export const truncate = css({
  width: "200px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden"
});
export const addParticipant = css({
  ...typography.B6_12_semibold,
  color: colors.Zeb_Solid_Bright_Blue,
  cursor: "pointer"
})

export const participantInput = css({
  background: colors.Zeb_Transparent_4,
  padding: "10px",
  borderRadius: "8px",
  position: "relative",
  marginBottom: "20px"
})

export const cross = css({
  position: "absolute",
  right: 10,
  top: 10,
  cursor: "pointer"
})

export const submitContainer = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: 8,
  button: {
    flex: 1
  }
})