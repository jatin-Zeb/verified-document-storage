import { Document } from "../typings/docs";
import createReducer from "../utils/redux/createReducer";

export enum ActionType {
  SET_USER_DOCUMENTS = "SET_USER_DOCUMENTS",
  SET_DOCUMENTS_LOADING = "SET_DOCUMENTS_LOADING"
}

export interface MPC {
  EmailsInvolved: Array<string>;
  Statuses: Array<boolean>;
  contractDetails: Document;
  sha: string;
}
export interface UploadedDocsProps {
  all: MPC[];
  signed: MPC[];
  pending: MPC[];
}
export interface UserDocs {
  uploadedDocs: UploadedDocsProps;
  isLoading: boolean;
}

const initialState: UserDocs = {
  uploadedDocs: { all: [], signed: [], pending: [] },
  isLoading: true
};

export default createReducer<UserDocs>(initialState, {
  [ActionType.SET_USER_DOCUMENTS](state: UserDocs, payload: unknown): UserDocs {
    return {
      ...state,
      uploadedDocs: payload as UploadedDocsProps,
    };
  },
  [ActionType.SET_DOCUMENTS_LOADING](state: UserDocs, payload: unknown): UserDocs {
    return {
      ...state,
      isLoading: payload as boolean,
    };
  },
});
