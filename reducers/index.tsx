import { CombinedState, combineReducers } from "redux";
import createReducer from "../utils/redux/createReducer";

import user, { UserState } from "./userInfo";
import docs, { UserDocs } from "./docs";

export interface StoreState {
  user: UserState;
  docs: UserDocs
}

export default combineReducers<CombinedState<StoreState>>({
  user,
  docs
})
