import { abi, contractAddress } from "./../../../constants";
import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { ContractContextType } from "./context";
import { Document } from "../../../typings/docs";
export const contractContext = createContext<ContractContextType | null>(null);
interface Props {
  children: React.ReactNode;
}
declare var window: any;
export const ContractHandler: React.FC<Props> = ({ children }) => {
  const [contract, setContract] = useState<any>();
  const [userAddress, setUserAddress] = useState<any>();

  const fetchWalletInfo = async () => {
    try {
      if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]);
        provider.on("accountsChanged", function(accounts) {
          setUserAddress(accounts[0]);
        });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
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
    type: string,
    description: string,
    name: string,
    email: string,
    startDate: string,
    endDate: string,
    createDate: string,
    sha256: string,
    IPFSUri: string
  ) {
    const contract = await checkAndConnectContract();
    await contract.addContract(
      category,
      type,
      description,
      name,
      email,
      startDate,
      endDate,
      createDate,
      sha256,
      IPFSUri
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
    createDate: string,
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
    if (userAddress) {
      const contract = await checkAndConnectContract();

      const contractSHA = await contract.getContractbyCreator();

      var result:Document[] = [];
      for (var i = 0; i < contractSHA.length; i++) {
        const res:Document  = await contract.getContract(contractSHA[i]);
        result.push(res);
      }
      return result;
    } else {
      return [];
    }
  }

  async function getUserKycInfo() {
    if (userAddress) {
    const contract = await checkAndConnectContract();
    const result = await contract.getUserKycInfo(userAddress);
    return result;
    }else {
      console.log("wallet not connnected");
    }
  }

  async function getAllUserContracts() {
    if (userAddress) {
      const contract = await checkAndConnectContract();
      var AllSigned = [];
      var Signed = [];
      var Pending = [];

      const createdContractSha =  await contract.getContractbyCreator();
      const contractShaArray = await contract.getAllInvitedContracts();
      const SHAs = createdContractSha.concat(contractShaArray)

      for(var i=0;i<SHAs.length;i++){
        const sha = SHAs[i];
        const contractDetails = await contract.getContract(sha);
        const data = await contract.getContractInfo(sha);
        const AddressesInvolved = data[0]
        const EmailsInvolved = data[1]
        const Statuses = data[2]
        const isAllSigned = data[3]
        const isSelfSigned = data[4]
        
        if(isAllSigned){
          AllSigned.push({contractDetails,AddressesInvolved,EmailsInvolved,Statuses, sha});
        }else if(isSelfSigned){
          Signed.push({contractDetails,AddressesInvolved,EmailsInvolved,Statuses, sha});
        }else{
          Pending.push({contractDetails,AddressesInvolved,EmailsInvolved,Statuses, sha});
        }
      }

      console.log("all signed");
      console.log(AllSigned);
      console.log("signed");
      console.log(Signed);
      console.log("pending");
      console.log(Pending);

      return [AllSigned,Signed,Pending];
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
      value={{ addContract, getContract, fetchWalletInfo, getUserContracts, addUserKycInfo, getUserKycInfo, approveTransaction, getAllUserContracts }}
    >
      {children}
    </contractContext.Provider>
  );
};
