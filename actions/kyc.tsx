import actionCreator from "../utils/redux/actionCreator";
import { Dispatch } from "../utils/redux/dispatch";
import { ActionType, KYC_VERIFICATION_STATUS } from "../reducers/kyc";
import { KycData, KYCDocument, KycReqData } from "../typings/kycDocs";
import axios from "axios";

const BASE_URL = "https://frightened-hen-waders.cyclic.app";

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
          Authorization: "Bearer " + token,
        },
        method: "GET",
      });

      const kycResData: KycData = response.data.data;
      setKycStatus(kycResData.status === "verified" ? 2 : 0);
      dispatch({
        type: ActionType.SET_KYC_DATA,
        payload: response.data.data,
      });
    }
  );
};

export const uploadKycDetails = async (token: string, kycData: KycReqData) => {
  actionCreator(
    "uploadKycData",
    async (dispatch: Dispatch): Promise<void> => {
      const response = await axios(BASE_URL + "/kyc", {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "POST",
        data: kycData,
      });
      const kycResData: KycData = response.data.data;
      setKycStatus(kycResData.status === "verified" ? 2 : 0);
      dispatch({
        type: ActionType.SET_KYC_DATA,
        payload: response.data.data,
      });
    }
  );
};
