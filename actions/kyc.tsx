import actionCreator from "../utils/redux/actionCreator";
import { Dispatch } from "../utils/redux/dispatch";
import { ActionType, KYC_VERIFICATION_STATUS } from "../reducers/kyc";
import { KycData, KYCDocument } from "../typings/kycDocs";
import axios from "axios";

const BASE_URL = "https://frightened-hen-waders.cyclic.app";

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

export const fetchKycData = async (token: string) => {
  actionCreator(
    "fetchKycData",
    async (dispatch: Dispatch): Promise<void> => {
      const response = await axios(BASE_URL + "/kyc", {
        headers: {
          "Authorization": "Bearer " + token
        },
        method: "GET"
      })
      console.log(response.data.data);
      dispatch({
        type: ActionType.SET_KYC_DATA,
        payload: response.data.data,
      });
    }
  );
}

export const uploadKycDetails = async (token: string, kycData: KycData) => {
  actionCreator(
    "uploadKycData",
    async (dispatch: Dispatch): Promise<void> => {
      const response = await axios(BASE_URL + "/kyc", {
        headers: {
          "Authorization": "Bearer " + token
        },
        method: "POST",
        data: kycData
      })
      console.log(response);
      // dispatch({
      //   type: ActionType.SET_KYC_VERIFIED,
      //   payload: response.data.data,
      // });
    }
  );
}