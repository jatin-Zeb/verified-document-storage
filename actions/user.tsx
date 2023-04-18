import actionCreator from "../utils/redux/actionCreator";
import { Dispatch } from "../utils/redux/dispatch";
import { ActionType } from "../reducers/userInfo";
import { GoogleLoginData } from "../typings/login";

export const setUserAddress = (address: string) => {
  actionCreator(
    "setUserAddress",
    async (dispatch: Dispatch): Promise<void> => {
      dispatch({
        type: ActionType.SET_USER_ADDRESS,
        payload: address
      });
    }
  );
}

export const setIsLoggedIn = (state: boolean) => {
  actionCreator(
    "setIsLoggedIn",
    async (dispatch: Dispatch): Promise<void> => {
      dispatch({
        type: ActionType.SET_LOGIN,
        payload: state
      });
    }
  );
}

export const setGoogleLoginData = (data: GoogleLoginData | null) => {
  actionCreator(
    "setGoogleLoginData",
    async (dispatch: Dispatch): Promise<void> => {
      dispatch({
        type: ActionType.SET_GOOGLE_DATA,
        payload: data
      })
    }
  )
}