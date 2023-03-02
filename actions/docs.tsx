import actionCreator from "../utils/redux/actionCreator";
import { Dispatch } from "../utils/redux/dispatch";
import { ActionType } from "../reducers/docs";
import { Document } from "../typings/docs";

export const setUserDocs = (docs: Document[]) => {
  actionCreator(
    "setUserAddress",
    async (dispatch: Dispatch): Promise<void> => {
      dispatch({
        type: ActionType.SET_USER_DOCUMENTS,
        payload: docs
      });
    }
  );
}