import { CombinedState, combineReducers } from "redux";
import createReducer from "../utils/redux/createReducer";

import user, { UserState } from "./userInfo";
import docs, { UserDocs } from "./docs";
import kyc, { KYCDocs } from "./kyc";

export interface StoreState {
  user: UserState;
  docs: UserDocs;
  kyc: KYCDocs;
}

export default combineReducers<CombinedState<StoreState>>({
  user,
  docs,
  kyc,
});
