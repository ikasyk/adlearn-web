import {userConst} from "../constants";

const initialState = {processed: true, isLoggedIn: false};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConst.AUTH_SUCCESS:
            return {
                processed: false,
                isLoggedIn: true,
                data: action.data,
                accessToken: action.accessToken
            };
            break;
        case userConst.AUTH_FAILED:
            return {
                processed: false,
                isLoggedIn: false
            };
            break;
        default:
            return state;
    }
}
