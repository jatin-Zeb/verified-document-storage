import { css } from "@emotion/react";
import { colors } from "../../styles1";

export const contactContainer = css({
  height: "100vh",
  backgroundColor: colors.Zeb_Solid_White,
  display: "flex",
  justifyContent: "center",
  padding: "50px",
});

export const details = css({
  flex: 1,
  color: colors.Zeb_Solid_Dark_Blue,
  h1: {
    fontSize: "50px",
  },
  maxWidth: "500px"
})

export const form = css({
  flex: 1,
  padding: "50px",
  maxWidth: "500px"
})

export const formContainer = css({
  backgroundColor: colors.Zeb_BG_Light_Blue,
  padding: "50px",
  borderRadius: "8px",
  input: {
    marginBottom: "30px",
  },
  textarea: {
    marginBottom: "30px",
    height: "100px"
  },
  button: {
    color: colors.Zeb_Solid_White,
    width: "100%",
    backgroundColor: colors.Zeb_Solid_Bright_Blue,
    border: "none",
    borderRadius: "4px",
    padding: "8px"
  }
})