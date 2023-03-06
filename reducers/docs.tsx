import { Document } from "../typings/docs";
import createReducer from "../utils/redux/createReducer";

export enum ActionType {
  SET_USER_DOCUMENTS = "SET_USER_DOCUMENTS",
}

export interface MPC {
  AddressesInvolved: Array<string>;
  EmailsInvolved: Array<string>;
  Statuses: boolean;
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
}

const initialState: UserDocs = {
  uploadedDocs: { all: [], signed: [], pending: [] },
};

export default createReducer<UserDocs>(initialState, {
  [ActionType.SET_USER_DOCUMENTS](state: UserDocs, payload: unknown): UserDocs {
    return {
      ...state,
      uploadedDocs: payload as UploadedDocsProps,
    };
  },
});
