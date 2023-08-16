/** @jsxImportSource @emotion/react */
import * as styles from "../styles1/signUp";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "antd";
import google from "../public/images/google.png";
import facebook from "../public/images/facebook.png";
import twitter from "../public/images/twitter.png";
import Image from "next/image";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { StoreState } from "../reducers";
import { UserState } from "../reducers/userInfo";

// @ts-nocheck
const SignUp: NextPage = () => {
  const [onRight, setOnRight] = useState(false);
  const [googleToken, setGoogleToken] = useState("");
  const userState = useSelector<StoreState, UserState>((state) => state.user);

  const profile = userState.googleData;
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("google_token");
    if (sessionToken) {
      setGoogleToken(sessionToken);
    }
  }, []);
  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      sessionStorage.setItem("google_token", codeResponse.access_token);
      setGoogleToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <div
      css={{
        position: "relative",
        background: "#f6f5f7",
        height: "100vh",
      }}
    >
      <div css={styles.container}>
        <div css={{ position: "relative" }}>
          <div
            css={[
              styles.formContainer,
              styles.signUpContainer,
              !onRight && styles.rightPanelActiveSignUp,
            ]}
          >
            SignUp
            <div>
              <p>Create Account</p>
              <div css={{ display: "flex", justifyContent: "space-between" }}>
                <div onClick={() => login()} css={styles.loginOptionContainer}>
                  <Image css={styles.loginImg} src={google} alt="" width={20} />
                </div>
                <div onClick={() => {}} css={styles.loginOptionContainer}>
                  <Image
                    css={styles.loginImg}
                    src={facebook}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
                <div onClick={() => {}} css={styles.loginOptionContainer}>
                  <Image
                    css={styles.loginImg}
                    src={twitter}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            css={[
              styles.formContainer,
              styles.loginContainer,
              !onRight && { opacity: 0, transform: "translateX(100%)" },
            ]}
          >
            Login
          </div>
          <div
            css={[
              styles.overlayContainer,
              !onRight && styles.overlayRightPanelActive,
            ]}
          >
            <div
              css={[styles.overlay, !onRight && styles.rightPanelActiveOverlay]}
            >
              <div
                css={[
                  styles.overlayPanel,
                  styles.overlayLeft,
                  !onRight && { transform: "translateX(0%)" },
                ]}
              >
                <Button
                  onClick={() => {
                    setOnRight(true);
                  }}
                >
                  Move Right
                </Button>
              </div>

              <div
                css={[
                  styles.overlayPanel,
                  styles.overlayRight,
                  !onRight && { transform: "translateX(20%)" },
                ]}
              >
                <Button
                  onClick={() => {
                    setOnRight(false);
                  }}
                >
                  Move Left
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
