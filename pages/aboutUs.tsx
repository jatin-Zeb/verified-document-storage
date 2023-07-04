/** @jsxImportSource @emotion/react */

import type { NextPage } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { css } from "@emotion/react";
import mission from "../public/images/mission.webp";

const About: NextPage = () => {

  return (
    <div>
      <div
        style={{
          height: "100vh",
          background: "#F5F5F5",
          overflow: "auto",
        }}
      >
        <div css={{ display: "flex" }}>
          <div
            css={{
              justifyContent: "end",
              transition: "0.2s all ease-in",
              margin: "auto auto",
            }}
          >
            <Header />
            <div
              style={{
                width: "100vw",
                height: "90vh",
                background: "#F5F5F5",
                color: "black",
                textAlign: "justify",
                textJustify: "inter-word",
                lineHeight: "1.5rem",
                display: "flex",
                justifyContent: "center",
                gap: "100px"
              }}>
              <div style={{ flex: "1", maxWidth: "400px" }}>
                <h1 style={{ fontSize: "40px" }}>Mission Statement</h1>
                <div>
                  At Docusmriti, our mission is to provide a secure and reliable
                  platform for individuals and businesses to store their important
                  documents. We believe that blockchain technology is the key to achieving
                  this goal, as it ensures transparency and immutability of data. Our aim is
                  to empower our users with the peace of mind that comes with knowing
                  their documents are safe and accessible at all times.
                </div>
              </div>
              <div>
                <div css={css({img:{maxWidth: "400px", maxHeight: "300px"}, flex: "1", paddingTop: "30px"})}>
                  <Image src={mission} alt="" />
                </div>
              </div>
              </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
