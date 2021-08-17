import UserConstants from "../contants/UserConstants";

export default function userReducer(state = null, {type, payload}) {
    switch (type) {
        case UserConstants.ADD_USER:
            return addUser(state, payload)
        case UserConstants.REMOVE_USER:
            return removeUser(state)
        default:
            return state;
    }
}

function addUser(state, user) {
    if (!user) {
        return state
    }

    return user
}

function removeUser(state) {

    return null
}