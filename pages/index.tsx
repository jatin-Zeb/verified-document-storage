/** @jsxImportSource @emotion/react */
import * as styles from "../components/LandingPage/styles";
import blockchain from "../public/images/blockchain111.gif";
import Image from "next/image";
import { NextPage } from "next";
import Header from "../components/Header";

// @ts-nocheck
const Home: NextPage = () => {
  return (
    <div css={styles.landingContainer}>
      <Header />
      <div css={styles.body}>
        <div css={styles.getStarted}>
          <div css={styles.getStartedText}>
            Looking for better way to store documents?
          </div>
          <div></div>
        </div>
        <div css={styles.icon}>
          <Image src={blockchain} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
