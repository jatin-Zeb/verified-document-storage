/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import Button from "../shared/Button";
import { useContext, useEffect, useState } from "react";
import { contractContext } from "../UserHome/Contract";
import { ContractContextType } from "../UserHome/Contract/context";
import { useRouter } from "next/router";
import metamask from "../../public/images/metamsk.png";
import google from "../../public/images/google.png";
import logo_doc from "../../public/images/logo_doc1.png";
import Image from "next/image";
import {
  getLoginDetails,
  setGoogleLoginData,
  setIsLoggedIn,
  setUserAddress,
} from "../../actions/user";
import { useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import { UserState } from "../../reducers/userInfo";
import { KYCDocs, KYC_STATUS } from "../../reducers/kyc";
import { Tooltip, Modal } from "antd";
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import axios from "axios";
import { fetchKycData } from "../../actions/kyc";

const Header = () => {
  const router = useRouter();
  const pathName = router.pathname;
  const [defaultAccount, setDefaultAccount] = useState("");
  const [signoutVisible, setSignOutVisible] = useState(false);
  const userState = useSelector<StoreState, UserState>((state) => state.user);
  const { kycVerified } = useSelector<StoreState, KYCDocs>(
    (state) => state.kyc
  );
  const [openModal, setOpenModal] = useState(false);
  const [googleToken, setGoogleToken] = useState("");
  const profile = userState.googleData;
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("google_token");
    if (sessionToken) {
      setGoogleToken(sessionToken);
    }
  }, []);

  useEffect(() => {
    if (userState.loginData) {
      setIsLoggedIn(true);
      if (userState.loginData.kyc_status === KYC_STATUS.VERIFIED) {
        fetchKycData(googleToken);
      }
    }
  }, [googleToken, userState.loginData]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      setOpenModal(false);
      sessionStorage.setItem("google_token", codeResponse.access_token);
      setGoogleToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const logOut = () => {
    googleLogout();
    setGoogleLoginData(null);
    getLoginDetails("");
  };

  useEffect(() => {
    if (googleToken) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken}`,
          {
            headers: {
              Authorization: `Bearer ${googleToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          getLoginDetails(googleToken).then(() => {
            setGoogleLoginData(res.data);
          });
        })
        .catch((err) => {
          console.log("error in api", err);
          sessionStorage.removeItem("google_token");
        });
    }
  }, [googleToken]);

  const accountChangedHandler = (newAccount: any) => {
    if (newAccount) {
      setDefaultAccount(String(newAccount));
      setUserAddress(String(newAccount));
      setIsLoggedIn(true);
    } else sessionStorage.clear();
  };
  useEffect(() => {
    console.log(userState);
    if (defaultAccount !== "") {
      setOpenModal(false);
    }
  }, [userState, defaultAccount]);
  useEffect(() => {
    if (!userState.isLoggedIn) {
      if (pathName !== "/" && pathName !== "/aboutUs") {
        // router.push("/");
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
        <Image
          src={logo_doc}
          alt=""
          onClick={() => setSignOutVisible(!signoutVisible)}
          style={{
            filter: "brightness(0.5)",
          }}
          width={50}
        />
        <div css={styles.webName(pathName)}>DocuSmriti</div>

        {router.pathname === "/" ? (
          <>
            <div
              css={styles.subHeading()}
              onClick={() => {
                router.push("/aboutUs");
              }}
            >
              About Us
            </div>
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
        <div css={{ position: "relative" }}>
           {profile ? (
            <div css={styles.address}>
              <Image
                src={profile.picture}
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
                alt=""
                onClick={() => setSignOutVisible(!signoutVisible)}
              />
              <Tooltip placement="bottomRight" title={defaultAccount}>
                &nbsp;
                <span onClick={() => setSignOutVisible(!signoutVisible)}>
                  {profile.given_name} {profile.family_name}
                </span>
                <div css={styles.walletAddress}>
                  {defaultAccount !== ""?defaultAccount.slice(0, 5) +
                    "....." +
                    defaultAccount.slice(defaultAccount.length - 5):null}
                </div>
              </Tooltip>

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
                      setGoogleLoginData(null);
                      sessionStorage.removeItem("google_token");
                      logOut();
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
              onClick={() => setOpenModal(true)}
              style={styles.buttonStyle}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={""}
        title="LOGIN"
        width={300}
      >
        <div>
          <div onClick={() => login()} css={styles.loginOptionContainer}>
            <Image css={styles.loginImg} src={google} alt="" width={20} />
            <div css={styles.loginTitle}>Google</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Header;
