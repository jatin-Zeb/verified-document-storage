import { Document } from "../../../typings/docs";

export type ContractContextType = {
  addContract: (
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
  ) => {};
  addUserKycInfo: (
    firstName: string,
    lastName: string,
    gender: string,
    dob: string,
    aadhaarNumber: string,
    aadhaarFrontURL: string,
    aadhaarBackURL: string,
    selfieURL: string,
    createDate: string
  ) => {};
  getContract: (IPFSUri: string) => any;
  getUserContracts: () => Promise<Document[]>;
  fetchWalletInfo: () => Promise<void>;
  getUserKycInfo: () => {};
  getAllUserContracts: () => {};
  approveTransaction: (email:string, sha: string) => any;
  getContractInfo: (sha: string) => any;
};
