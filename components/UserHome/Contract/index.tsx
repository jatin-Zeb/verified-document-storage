import { abi, contractAddress } from "./../../../constants";
import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { ContractContextType } from "./context";
import { Document } from "../../../typings/docs";
import actionCreator from "../../../utils/redux/actionCreator";
import { Dispatch } from "../../../utils/redux/dispatch";
import { ActionType, KYC_STATUS } from "../../../reducers/kyc";
import { KYCDocument } from "../../../typings/kycDocs";
import { setIsLoggedIn } from "../../../actions/user";
import { fetchKycData } from "../../../actions/kyc";
import { setUserDocs } from "../../../actions/docs";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import { UserState } from "../../../reducers/userInfo";
import { useRouter } from "next/router";
export const contractContext = createContext<ContractContextType | null>(null);

const rpcProvider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/n4yLaiI4besVGa-VK5rIPefdWiUznMJL"
);
interface Props {
  children: React.ReactNode;
}
declare var window: any;
export const ContractHandler: React.FC<Props> = ({ children }) => {
  const [contract, setContract] = useState<any>();
  const [userAddress, setUserAddress] = useState<any>();
  const userState = useSelector<StoreState, UserState>((state) => state.user);
  const router = useRouter();
  const fetchWalletInfo = async () => {
    try {
      if (window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]);
        provider.on("accountsChanged", function(accounts) {
          setUserAddress(accounts[0]);
        });
        setIsLoggedIn(true);

        return true;
      } else {
        alert("No metamask installed!!");
        setIsLoggedIn(false);
        return false;
      }
    } catch (e) {
      setIsLoggedIn(false);
      return false;
    }
  };

  const checkAndConnectContract = async () => {
    if (!contract) {
      const tempContract = new ethers.Contract(
        contractAddress["5"][0],
        abi,
        rpcProvider
      );
      setContract(tempContract);
      return tempContract;
    }
    return contract;
  };

  const checkAndConnectContractWithSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tempContract = new ethers.Contract(
      contractAddress["5"][0],
      abi,
      provider.getSigner()
    );
    return tempContract;
  };

  async function addContract(
    category: string,
    description: string,
    name: string,
    email: string,
    startDate: string,
    endDate: string,
    createDate: string,
    sha256: string,
    IPFSUri: string,
    InvitesEmail: string[]
  ) {
    const isWalletConnected = await fetchWalletInfo();
    if (!isWalletConnected) {
      return;
    }
    const contract = await checkAndConnectContractWithSigner();
    await contract.addContract(
      category,
      description,
      name,
      userState.googleData?.email,
      startDate,
      endDate,
      createDate,
      sha256,
      IPFSUri,
      InvitesEmail
    );
  }

  async function addUserKycInfo(
    firstName: string,
    lastName: string,
    gender: string,
    dob: string,
    aadhaarNumber: string,
    aadhaarFrontURL: string,
    aadhaarBackURL: string,
    selfieURL: string,
    createDate: string
  ) {
    const contract = await checkAndConnectContract();
    await contract.addUserKycInfo(
      firstName,
      lastName,
      gender,
      dob,
      aadhaarNumber,
      aadhaarFrontURL,
      aadhaarBackURL,
      selfieURL,
      createDate
    );
  }

  async function getContract(sha256: string) {
    const contract = await checkAndConnectContract();
    const result = await contract.getContract(sha256);
    return result;
  }

  async function getUserContracts() {
    if (userState.isLoggedIn) {
      const contract = await checkAndConnectContract();
      var allSigned = [];
      var signed = [];
      var pending = [];

      const createdContractSha = await contract.getContractbyCreator(
        userState.googleData?.email
      );
      const contractShaArray = await contract.getAllInvitedContracts(
        userState.googleData?.email
      );
      const SHAs = createdContractSha.concat(contractShaArray);
      console.log(SHAs);

      for (var i = 0; i < SHAs.length; i++) {
        const sha = SHAs[i];
        const contractDetails = await contract.getContract(sha);
        const data = await contract.getContractInfo(
          userState.googleData?.email,
          sha
        );
        const EmailsInvolved = data[0];
        const Statuses = data[1];
        const isAllSigned = data[2];
        const isSelfSigned = data[3];

        if (isAllSigned) {
          allSigned.push({
            contractDetails,
            EmailsInvolved,
            Statuses,
            sha,
          });
        } else if (isSelfSigned) {
          signed.push({
            contractDetails,
            EmailsInvolved,
            Statuses,
            sha,
          });
        } else {
          pending.push({
            contractDetails,
            EmailsInvolved,
            Statuses,
            sha,
          });
        }
      }

      setUserDocs({ all: allSigned, signed, pending });
    } else {
      console.log("wallet not connnected");
    }
  }

  async function approveTransaction(email: string, sha: string) {
    const isWalletConnected = await fetchWalletInfo();
    if (!isWalletConnected) {
      return;
    }
    const contract = await checkAndConnectContractWithSigner();
    await contract.approveTransaction(userState.googleData?.email, sha);
  }

  async function getContractInfo(sha: string) {
    if (userState.isLoggedIn) {
      const contract = await checkAndConnectContract();
      const contractDetails = await contract.getContract(sha);
      const data = await contract.getContractInfo(
        userState.googleData?.email,
        sha
      );
      return [contractDetails, data];
    } else {
      console.log("wallet not connnected");
    }
  }

  return (
    <contractContext.Provider
      value={{
        addContract,
        getContract,
        fetchWalletInfo,
        getUserContracts,
        addUserKycInfo,
        approveTransaction,
        getContractInfo,
      }}
    >
      {children}
    </contractContext.Provider>
  );
};
