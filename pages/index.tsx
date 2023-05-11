/** @jsxImportSource @emotion/react */
import * as styles from "../components/LandingPage/styles";
import mainPageImage from "../public/images/mainPageImage1.webp";
import mainPageImage1 from "../public/images/mainPageImage2.webp";
import mainPageImage2 from "../public/images/mainPageImage3.webp";
import mainPageImage3 from "../public/images/mainPageImage4.webp";
import mainPageImage4 from "../public/images/mainPageImage5.webp";

import Image from "next/image";
import { NextPage } from "next";
import Header from "../components/Header";
import { Button } from "antd";
import { utils } from "../styles1";
import { useRouter } from "next/router";
import { StoreState } from "../reducers";
import { KYCDocs } from "../reducers/kyc";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/userInfo";
import NewsLetter from "../components/NewsLetter";
import { css } from "@emotion/react";
import { colors } from "../styles1";
import contactUs from "../public/images/contactUs.png";


// @ts-nocheck
const Home: NextPage = () => {
  const history = useRouter();
  const router = useRouter();
  const { isLoggedIn } = useSelector<StoreState, UserState>(
    (state) => state.user
  );

  const { kycVerified } = useSelector<StoreState, KYCDocs>(
    (state) => state.kyc
  );
  return (
    <>
    <div css={styles.landingContainer}>
      <Header />
      <div css={styles.body}>
        <div>
          <div css={styles.main}>
            <div css={utils.widthPercentage(60)}>
              <p css={styles.heading}>
                Secure Document Storage on Blockchain Platform
              </p>
              <p css={styles.subHeading}>
                Securely store your important documents on the Blockchain with
                Docusmriti – the ultimate solution for document storage.
              </p>
              {isLoggedIn && kycVerified !== 2 && (
                <p css={styles.subHeading}>
                  To Get Started, Please verify your KYC first
                </p>
              )}
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  if (!isLoggedIn || kycVerified === 2) {
                    history.push("/docs");
                  } else {
                    history.push("/profile");
                  }
                }}
              >
                {!isLoggedIn || kycVerified === 2
                  ? "View All Services"
                  : "Please Verify KYC"}
              </Button>
            </div>
            <Image src={mainPageImage} width={300} height={300} alt="main" />
          </div>
          <div css={styles.subContent}>
            <p css={styles.subContentHeading}>Our services</p>
            <div css={{ display: "flex", justifyContent: "space-between" }}>
              <div css={{ width: "30%" }}>
                <Image
                  src={mainPageImage1}
                  width={400}
                  alt="services1"
                  height={400}
                />

                <p css={styles.featureHeading}>
                  Secure Document Storage on Blockchain
                </p>
                <p css={styles.featureSubHeading}>
                  Blockchain is a decentralized digital ledger technology that
                  enables secure and transparent transactions without the need
                  for intermediaries.
                </p>
              </div>
              <div css={{ width: "30%" }}>
                <Image
                  src={mainPageImage2}
                  width={400}
                  alt="services2"
                  height={400}
                />
                <p css={styles.featureHeading}>Blockchain Document Vault</p>
                <p css={styles.featureSubHeading}>
                  Our document storage service ensures safe and secure
                  preservation of your important files, while also allowing easy
                  access and retrieval when needed.
                </p>
              </div>
              <div css={{ width: "30%" }}>
                <Image
                  src={mainPageImage3}
                  width={400}
                  alt="services3"
                  height={400}
                />

                <p css={styles.featureHeading}>
                  Blockchain Document Storage Made Easy
                </p>
                <p css={styles.featureSubHeading}>
                  Our Ease of Access service provides convenient and efficient
                  access to our products and services, improving the overall
                  customer experience.
                </p>
              </div>
            </div>
            <span css={{ display: "flex", width: "100%", marginTop: "40px" }}>
              <span css={styles.feature}>Features & Benefits</span>
            </span>
            <div
              css={{
                display: "flex",
                marginTop: "30px",
                justifyContent: "space-between",
              }}
            >
              <div css={{ width: "30%" }}>
                <p css={styles.benefitHeading}>Feature</p>
                <ul css={styles.ul}>
                  <li>
                    Utilizes Blockchain technology to ensure secure document
                    storage
                  </li>
                  <li>
                    Provides a tamper-proof and auditable record of all document
                    changes
                  </li>
                  <li>
                    Offers fast and easy access to stored documents from any
                    device
                  </li>
                  <li>
                    Provides a user-friendly interface for easy document
                    uploading and management
                  </li>
                  <li>
                    Offers customizable privacy settings to ensure that
                    documents are only accessible to authorized parties
                  </li>
                </ul>
              </div>
              <div css={{ width: "30%" }}>
                <p css={styles.benefitHeading}>Benefits</p>
                <ul css={styles.ul}>
                  <li>
                    Unmatched security: Our Blockchain powered website provides
                    the highest level of security for your documents, ensuring
                    that they are tamper-proof and can never be lost or stolen.
                  </li>
                </ul>
              </div>
              <Image
                src={mainPageImage4}
                width={450}
                alt="feature"
                height={450}
              />
            </div>
          </div>
          <NewsLetter />
        </div>
      </div>
      </div>
      <div
        onClick={()=>router.push("/contact")}
        css={css({
          position: "sticky",
          bottom: "40px",
          left: "95%",
          width: "50px",
          backgroundColor: colors.Zeb_Solid_Bright_Blue,
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer"
        })}>
        <Image width={30} height={30} src={contactUs} alt="" />
        </div>
    </>
  );
};

export default Home;
