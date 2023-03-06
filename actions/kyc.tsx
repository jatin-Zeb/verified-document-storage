import actionCreator from "../utils/redux/actionCreator";
import { Dispatch } from "../utils/redux/dispatch";
import { Document } from "../typings/docs";
import { ActionType, KYC_VERIFICATION_STATUS } from "../reducers/kyc";
import { KYCDocument } from "../typings/kycDocs";

export const setKycDocs = (docs: KYCDocument) => {
  actionCreator(
    "setKycDocs",
    async (dispatch: Dispatch): Promise<void> => {
      dispatch({
        type: ActionType.SET_KYC_DOCUMENTS,
        payload: docs,
      });
    }
  );
};

export const setKycStatus = (status: KYC_VERIFICATION_STATUS) => {
  actionCreator(
    "setKycVerified",
    async (dispatch: Dispatch): Promise<void> => {
      dispatch({
        type: ActionType.SET_KYC_VERIFIED,
        payload: status,
      });
    }
  );
};
