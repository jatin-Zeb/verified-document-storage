import { abi, contractAddress } from "./../../../constants";
import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { ContractContextType } from "./context";
import { Document } from "../../../typings/docs";
import actionCreator from "../../../utils/redux/actionCreator";
import { Dispatch } from "../../../utils/redux/dispatch";
import { ActionType } from "../../../reducers/kyc";
import { KYCDocument } from "../../../typings/kycDocs";
import { setIsLoggedIn } from "../../../actions/user";
import { setKycDocs, setKycStatus } from "../../../actions/kyc";
import { setUserDocs } from "../../../actions/docs";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import { UserState } from "../../../reducers/userInfo";
export const contractContext = createContext<ContractContextType | null>(null);
interface Props {
  children: React.ReactNode;
}
declare var window: any;
export const ContractHandler: React.FC<Props> = ({ children }) => {
  const [contract, setContract] = useState<any>();
  const [userAddress, setUserAddress] = useState<any>();
  const userState = useSelector<StoreState, UserState>((state) => state.user);

  const fetchWalletInfo = async () => {
    try {
      if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]);
        provider.on("accountsChanged", function(accounts) {
          setUserAddress(accounts[0]);
        });
        setIsLoggedIn(true);

        // return true;
      } else {
        setIsLoggedIn(false);
        // return false;
      }
    } catch (e) {
      setIsLoggedIn(false);
      // return false;
    }
  };

  const checkAndConnectContract = async () => {
    if (!contract && typeof window !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const tempContract = new ethers.Contract(
        contractAddress["5"][0],
        abi,
        provider.getSigner()
      );
      setContract(tempContract);
      return tempContract;
    }
    return contract;
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
    InvitesAddress: string[],
    InvitesEmail: string[]
  ) {
    const contract = await checkAndConnectContract();
    await contract.addContract(
      category,
      description,
      name,
      email,
      startDate,
      endDate,
      createDate,
      sha256,
      IPFSUri,
      InvitesAddress,
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
    getAllUserContracts();
    if (userState.address) {
      const contract = await checkAndConnectContract();

      const contractSHA = await contract.getContractbyCreator();

      var result: Document[] = [];
      for (var i = 0; i < contractSHA.length; i++) {
        const res: Document = await contract.getContract(contractSHA[i]);
        result.push(res);
      }
      return result;
    } else {
      return [];
    }
  }

  async function getUserKycInfo() {
    console.log("fetch kyc data");
    console.log(userState);
    if (userState.address) {
      const contract = await checkAndConnectContract();
      const result: KYCDocument = await contract.getUserKycInfo(
        userState.address
      );
      actionCreator(
        "setKycDocs",
        async (dispatch: Dispatch): Promise<void> => {
          dispatch({
            type: ActionType.SET_KYC_DOCUMENTS,
            payload: result,
          });
        }
      );
      setKycDocs(result);
      setKycStatus(result.AadhaarNumber ? 2 : 0);
      return result;
    } else {
      console.log(" i m hee");
      console.log("wallet not connnected");
    }
  }

  async function getAllUserContracts() {
    if (userState.address) {
      const contract = await checkAndConnectContract();
      var allSigned = [];
      var signed = [];
      var pending = [];

      const createdContractSha = await contract.getContractbyCreator();
      const contractShaArray = await contract.getAllInvitedContracts();
      const SHAs = createdContractSha.concat(contractShaArray);

      for (var i = 0; i < SHAs.length; i++) {
        const sha = SHAs[i];
        const contractDetails = await contract.getContract(sha);
        const data = await contract.getContractInfo(sha);
        const AddressesInvolved = data[0];
        const EmailsInvolved = data[1];
        const Statuses = data[2];
        const isAllSigned = data[3];
        const isSelfSigned = data[4];

        if (isAllSigned) {
          allSigned.push({
            contractDetails,
            AddressesInvolved,
            EmailsInvolved,
            Statuses,
            sha,
          });
        } else if (isSelfSigned) {
          signed.push({
            contractDetails,
            AddressesInvolved,
            EmailsInvolved,
            Statuses,
            sha,
          });
        } else {
          pending.push({
            contractDetails,
            AddressesInvolved,
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

  async function approveTransaction(sha: string) {
    const contract = await checkAndConnectContract();
    await contract.approveTransaction(sha);
  }

  return (
    <contractContext.Provider
      value={{
        addContract,
        getContract,
        fetchWalletInfo,
        getUserContracts,
        addUserKycInfo,
        getUserKycInfo,
        approveTransaction,
        getAllUserContracts,
      }}
    >
      {children}
    </contractContext.Provider>
  );
};
