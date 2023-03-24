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
import { setIsLoggedIn, setUserAddress } from "../../actions/user";
import { useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import { UserState } from "../../reducers/userInfo";
import { KYCDocs } from "../../reducers/kyc";
import { Tooltip, Modal } from "antd";

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
  const [openModal, setOpenModal] = useState(false);

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
          {defaultAccount !== "" ? (
            <div css={styles.address}>
              <Image
                src={metamask}
                alt=""
                onClick={() => setSignOutVisible(!signoutVisible)}
              />
              <Tooltip placement="bottomRight" title={defaultAccount}>
                <span onClick={() => setSignOutVisible(!signoutVisible)}>
                  {defaultAccount.slice(0, 5) +
                    "....." +
                    defaultAccount.slice(defaultAccount.length - 5)}
                </span>
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
          <div css={styles.loginOptionContainer}>
            <Image css={styles.loginImg} src={google} alt="" width={20} />
            <div css={styles.loginTitle}>Google</div>
          </div>
        </div>
        <div>
          <div css={styles.loginOptionContainer} onClick={connectWalletHandler}>
            <Image css={styles.loginImg} src={metamask} alt="" width={20} />
            <div css={styles.loginTitle}>Metamask</div>
          </div>
        </div>
      </Modal> 
    </div>
  );
};
export default Header;
