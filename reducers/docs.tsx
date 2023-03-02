import { Document } from "../typings/docs";
import createReducer from "../utils/redux/createReducer";

export enum ActionType {
  SET_USER_DOCUMENTS = "SET_USER_DOCUMENTS",
}

export interface UserDocs {
  uploadedDocs: Document[];
}

const initialState: UserDocs = {
  uploadedDocs: []
};

export default createReducer<UserDocs>(initialState, {
  [ActionType.SET_USER_DOCUMENTS](
    state: UserDocs,
    payload: unknown
  ): UserDocs {
    return {
      ...state,
      uploadedDocs: payload as Document[],
    };
  },
});
