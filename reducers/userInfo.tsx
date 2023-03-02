import createReducer from "../utils/redux/createReducer";

export enum ActionType {
  SET_USER_ADDRESS = "SET_USER_ADDRESS",
  SET_LOGIN = "SET_LOGIN"
}

export interface UserState {
  isLoggedIn: boolean;
  address: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  address: ""
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
  }
});