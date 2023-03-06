import { KYCDocument } from "../typings/kycDocs";
import createReducer from "../utils/redux/createReducer";

export enum ActionType {
  SET_KYC_DOCUMENTS = "SET_KYC_DOCUMENTS",
  SET_KYC_VERIFIED = "SET_KYC_VERIFIED",
}
//Not started, verification pending , completed
export type KYC_VERIFICATION_STATUS = 0 | 1 | 2;

export interface KYCDocs {
  kycDocs: KYCDocument;
  kycVerified: KYC_VERIFICATION_STATUS;
}

const initialState: KYCDocs = {
  kycDocs: {
    AadhaarBackURL: "",
    AadhaarFrontURL: "",
    AadhaarNumber: "",
    CreateDate: "",
    DOB: "",
    FirstName: "",
    Gender: "",
    LastName: "",
    SelfieURL: "",
  },
  kycVerified: 0,
};

export default createReducer<KYCDocs>(initialState, {
  [ActionType.SET_KYC_DOCUMENTS](state: KYCDocs, payload: unknown): KYCDocs {
    return {
      ...state,
      kycDocs: payload as KYCDocument,
    };
  },
  [ActionType.SET_KYC_VERIFIED](state: KYCDocs, payload: unknown): KYCDocs {
    return {
      ...state,
      kycVerified: payload as KYC_VERIFICATION_STATUS,
    };
  },
});
