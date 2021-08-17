import UserConstants from "../contants/UserConstants";

function addUser(user) {
    return (dispatch) => {
        dispatch({
            type: UserConstants.ADD_USER,
            payload: user
        })
    }
}

function removeUser() {
    return (dispatch) => {
        dispatch({
            type: UserConstants.REMOVE_USER,
        })
    }
}

export {addUser, removeUser}