import actionCreator from "../utils/redux/actionCreator";
import { Dispatch } from "../utils/redux/dispatch";
import { ActionType } from "../reducers/userInfo";
import { GoogleLoginData } from "../typings/login";
import axios from "axios";

const BASE_URL = "https://rose-ill-clownfish.cyclic.app";

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

export const getLoginDetails = async (token: string) => {
  actionCreator(
    "setLoginData",
    async (dispatch: Dispatch): Promise<void> => {
      try {
        const response = await axios(BASE_URL + "/login", {
          headers: {
            "Authorization": "Bearer " + token
          },
          method: "POST"
        })
        dispatch({
          type: ActionType.SET_LOGIN_DATA,
          payload: response.data.data
        })
      } catch (e) {
        dispatch({
          type: ActionType.SET_LOGIN_DATA,
          payload: null
        })
      }
    }
  )
}