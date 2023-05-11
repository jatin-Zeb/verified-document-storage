/** @jsxImportSource @emotion/react */
import * as styles from "../components/LandingPage/styles";
import blockchain from "../public/images/blockchain111.gif";
import mainPageImage from "../public/images/mainPageImage1.webp";
import mainPageImage1 from "../public/images/mainPageImage2.webp";
import mainPageImage2 from "../public/images/mainPageImage3.webp";
import mainPageImage3 from "../public/images/mainPageImage4.webp";
import mainPageImage4 from "../public/images/mainPageImage5.webp";

import Image from "next/image";
import { NextPage } from "next";
import Header from "../components/Header";
import { Button } from "antd";
import { mixins, utils } from "../styles1";

// @ts-nocheck
const Home: NextPage = () => {
  return (
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
              <Button type="primary" size="large">
                View All Services
              </Button>
            </div>
            <Image src={mainPageImage} width={300} height={300} alt="main" />
          </div>

          <div css={styles.subContent}>
            <p css={styles.subContentHeading}>Our services</p>
            <div css={{ display: "flex" }}>
              <div>
                <Image
                  src={mainPageImage1}
                  width={300}
                  alt="services1"
                  height={300}
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
              <div>
                <Image
                  src={mainPageImage2}
                  width={300}
                  alt="services2"
                  height={300}
                />
                <p css={styles.featureHeading}>Blockchain Document Vault</p>
                <p css={styles.featureSubHeading}>
                  Our document storage service ensures safe and secure
                  preservation of your important files, while also allowing easy
                  access and retrieval when needed.
                </p>
              </div>
              <div>
                <Image
                  src={mainPageImage3}
                  width={300}
                  alt="services3"
                  height={300}
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
            <span css={{ display: "flex", width: "100%" }}>
              <span css={styles.feature}>Features & Benefits</span>
            </span>
            <div css={{ display: "flex" }}>
              <ul>
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
                  Provides a user-friendly interface for easy document uploading
                  and management
                </li>
                <li>
                  Offers customizable privacy settings to ensure that documents
                  are only accessible to authorized parties
                </li>
              </ul>
              <ul>
                <li>
                  Unmatched security: Our Blockchain powered website provides
                  the highest level of security for your documents, ensuring
                  that they are tamper-proof and can never be lost or stolen.
                </li>
              </ul>
              <Image
                src={mainPageImage4}
                width={300}
                alt="feature"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* <Image src={blockchain} alt="" /> */}
      </div>
    </div>
  );
};

export default Home;
