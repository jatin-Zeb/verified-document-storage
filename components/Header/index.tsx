/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import Button from "../shared/Button";
import { useContext, useEffect, useState } from "react";
import { contractContext } from "../UserHome/Contract";
import { ContractContextType } from "../UserHome/Contract/context";
import { useRouter } from "next/router";
import metamask from "../../public/images/metamsk 1.png";
import Image from "next/image";
import { setIsLoggedIn, setUserAddress } from "../../actions/user";
import { useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import { UserState } from "../../reducers/userInfo";
import { KYCDocs } from "../../reducers/kyc";

const Header = () => {
  const router = useRouter();
  const pathName = router.pathname;
  const [defaultAccount, setDefaultAccount] = useState("");
  const [signoutVisible, setSignOutVisible] = useState(false);
  const userState = useSelector<StoreState, UserState>((state) => state.user);
  const { addContract, getUserContracts, fetchWalletInfo } = useContext(
    contractContext
  ) as ContractContextType;
  const { kycVerified } = useSelector<StoreState, KYCDocs>(
    (state) => state.kyc
  );

  const accountChangedHandler = (newAccount: any) => {
    if (newAccount) {
      setDefaultAccount(String(newAccount));
      setUserAddress(String(newAccount));
      setIsLoggedIn(true);
    } else sessionStorage.clear();
  };
  useEffect(() => {
    console.log(userState);
  }, [userState]);
  useEffect(() => {
    if (!userState.isLoggedIn) {
      if (pathName !== "/") {
        router.push("/");
      }
    }
    if (userState.address) {
      setDefaultAccount(userState.address);
    } else {
      setDefaultAccount("");
    }
  }, [pathName, router, userState]);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    }
  };

  const onChainChangedHandler = () => {
    window.location.reload();
  };
  if (typeof window !== "undefined") {
    //@ts-ignore
    if (window.ethereum && window.ethereum.on)
      window.ethereum.on("accountsChanged", accountChangedHandler);
    //@ts-ignore
    if (window.ethereum && window.ethereum.on)
      window.ethereum.on("chainChanged", onChainChangedHandler);
  }
  return (
    <div css={styles.header}>
      <div css={styles.topBar}>
        <div css={styles.webName(pathName)}>Verified Document Storage</div>
        {router.pathname === "/" ? (
          <>
            <div
              css={styles.subHeading(userState.isLoggedIn && kycVerified === 2)}
              onClick={() => {
                if (userState.isLoggedIn) router.push("/docs");
              }}
            >
              Docs
            </div>
            {userState.isLoggedIn && kycVerified === 0 && (
              <div
                css={styles.subHeading()}
                onClick={() => {
                  if (userState.isLoggedIn) router.push("/profile");
                }}
              >
                Kyc
              </div>
            )}
            <div css={styles.subHeading()}>FAQs</div>
            <div css={styles.subHeading()}>About Us</div>
          </>
        ) : (
          <Button
            type="link"
            onClick={() => {
              router.push("/");
            }}
          >
            HOME
          </Button>
        )}
      </div>

      <div css={styles.loginStatus}>
        <Button type="link" onClick={() => {}} style={styles.buttonStyle}>
          Get Started
        </Button>
        <div css={{ position: "relative" }}>
          {defaultAccount !== "" ? (
            <div css={styles.address}>
              <Image
                src={metamask}
                alt=""
                onClick={() => setSignOutVisible(!signoutVisible)}
              />
              <span onClick={() => setSignOutVisible(!signoutVisible)}>
                {defaultAccount}
              </span>
              {signoutVisible && (
                <span css={styles.signoutContainer}>
                  <div
                    css={styles.selectOverlay}
                    onClick={() => setSignOutVisible(false)}
                  ></div>
                  <div
                    css={styles.signout}
                    onClick={() => {
                      setDefaultAccount("");
                      setIsLoggedIn(false);
                      setUserAddress("");
                      setSignOutVisible(false);
                    }}
                  >
                    Sign Out
                  </div>
                </span>
              )}
            </div>
          ) : (
            <Button
              type="link"
              onClick={connectWalletHandler}
              style={styles.buttonStyle}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
