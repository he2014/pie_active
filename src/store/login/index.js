const type = "LOGIN_KEY";

export const loginAction = (key = {}) => {
    return {
        type,
        key
    }
};

const defaultLogin = {};
export const loginReducer = (state = defaultLogin, action = {}) => {
    switch (action.type) {
        case action.type:
            return { state, ...action.key };
        default:
            return state;
    }
}

