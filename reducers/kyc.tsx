import { KycData, KYCDocument } from "../typings/kycDocs";
import createReducer from "../utils/redux/createReducer";

export enum ActionType {
  SET_KYC_VERIFIED = "SET_KYC_VERIFIED",
  SET_KYC_DATA = "SET_KYC_DATA",
}
//Not started, verification pending , completed
export type KYC_VERIFICATION_STATUS = 0 | 1 | 2;

export enum KYC_STATUS {
  VERIFIED = "verified",
  NOT_VERIFIED = "not_verified",
}
export interface KYCDocs {
  kycVerified: KYC_VERIFICATION_STATUS;
  kycData: KycData | null;
}

const initialState: KYCDocs = {
  kycVerified: 0,
  kycData: null,
};

export default createReducer<KYCDocs>(initialState, {
  [ActionType.SET_KYC_VERIFIED](state: KYCDocs, payload: unknown): KYCDocs {
    return {
      ...state,
      kycVerified: payload as KYC_VERIFICATION_STATUS,
    };
  },
  [ActionType.SET_KYC_DATA](state: KYCDocs, payload: unknown): KYCDocs {
    return {
      ...state,
      kycData: payload as KycData,
    };
  },
});
