import createReducer from "../utils/redux/createReducer";
import { GoogleLoginData, LoginData } from "../typings/login";

export enum ActionType {
  SET_USER_ADDRESS = "SET_USER_ADDRESS",
  SET_LOGIN = "SET_LOGIN",
  SET_GOOGLE_DATA = "SET_GOOGLE_DATA",
  SET_LOGIN_DATA = "SET_LOGIN_DATA"
}

export interface UserState {
  isLoggedIn: boolean;
  googleData: GoogleLoginData | null;
  address: string;
  loginData: LoginData | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  googleData: null,
  address: "",
  loginData: null
}

export default createReducer<UserState>(initialState, {
  [ActionType.SET_LOGIN](state: UserState, payload: unknown): UserState {
    return {
      ...state,
      isLoggedIn: payload as boolean
    };
  },
  [ActionType.SET_USER_ADDRESS](state: UserState, payload: unknown): UserState {
    return {
      ...state,
      address: payload as string
    };
  },
  [ActionType.SET_GOOGLE_DATA](state: UserState, payload: unknown): UserState {
    return {
      ...state,
      googleData: payload as GoogleLoginData
    };
  },
  [ActionType.SET_LOGIN_DATA](state: UserState, payload: unknown): UserState {
    return {
      ...state,
      loginData: payload as LoginData
    };
  }
});