/** @jsxImportSource @emotion/react */
import type { NextPage } from "next";
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import LandingPage from "../components/LandingPage";
import contactUs from "../public/images/contactUs.png";
import Image from "next/image";
import { colors } from "../styles1";
import { useRouter } from "next/router";
// @ts-nocheck
const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <LandingPage />
      <div
        onClick={()=>router.push("/contact")}
        css={css({
          position: "absolute",
          bottom: "40px",
          right: "40px",
          backgroundColor: colors.Zeb_Solid_Bright_Blue,
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer"
        })}>
        <Image width={30}height={30} src={contactUs} alt="" />
      </div>
    </div>
  );
};

export default Home;
