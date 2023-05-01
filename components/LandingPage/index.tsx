/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect } from "react";
import * as styles from "./styles";
import Header from "../Header";
import Button from "../shared/Button";
import blockchain from "../../public/images/blockchain111.gif";
import Image from "next/image";
import { useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import { KYCDocs } from "../../reducers/kyc";
import { UserState } from "../../reducers/userInfo";
import { useRouter } from "next/router";
import { setIsLoggedIn, setUserAddress } from "../../actions/user";
import { contractContext } from "../UserHome/Contract";
import { ContractContextType } from "../UserHome/Contract/context";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { kycVerified } = useSelector<StoreState, KYCDocs>(
    (state) => state.kyc
  );

  const accountChangedHandler = (newAccount: any) => {
    if (newAccount) {
      setUserAddress(String(newAccount));
    } else sessionStorage.clear();
  };

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    }
  };

  const getStartedClickHandler = () => {
    if (kycVerified === 2) router.push("/docs");
    else router.push("/profile");
  };
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

export default LandingPage;
