import actionCreator from "../utils/redux/actionCreator";
import { Dispatch } from "../utils/redux/dispatch";
import { ActionType, UploadedDocsProps } from "../reducers/docs";
import { NewDoc } from "../typings/docs";
import axios from "axios";

const BASE_URL = "https://frightened-hen-waders.cyclic.app";

export const setUserDocs = (docs: UploadedDocsProps) => {
  actionCreator(
    "setUserAddress",
    async (dispatch: Dispatch): Promise<void> => {
      dispatch({
        type: ActionType.SET_USER_DOCUMENTS,
        payload: docs,
      });
    }
  );
};

export const addNewContract = async (doc: NewDoc, token: string) => {
  try {
    const response = await axios(BASE_URL + "/addContract", {
      headers: {
        "Authorization": "Bearer " + token
      },
      method: "POST",
      data: doc
    });
    return response.data.data;
  } catch (e) {
    return e;
  }
}

export const acceptContract = async (sha256: string, token: string) => {
  try {
    const response = await axios(BASE_URL + "/acceptContract", {
      headers: {
        "Authorization": "Bearer " + token
      },
      method: "POST",
      data: { sha256: sha256 }
    });
    return response.data.data;
  } catch (e) {
    return e;
  }
}

export const setDocumentsLoading = (state: boolean) => {
  actionCreator(
    "setDocumentsLoading",
    async (dispatch: Dispatch): Promise<void> => {
      dispatch({
        type: ActionType.SET_DOCUMENTS_LOADING,
        payload: state,
      });
    }
  );
} 