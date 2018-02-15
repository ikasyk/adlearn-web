import {userConst} from "../constants";

export function login(state = {}, action) {
    switch (action.type) {
        case userConst.LOGIN_SUCCESS:
            return {
                accessToken: action.data.access_token,
                expires: action.data.expires_in
            };
            break;
        case userConst.LOGIN_FAILED:
            return {};
            break;
        default:
            return state;
    }
}