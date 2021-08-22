import UserConstants from "../contants/UserConstants";
import storageService from "../../services/storage.service"

function addUser(user) {
    if (! storageService.getItem({item: 'user'})) {
        
        storageService.setItem({
            item: 'user', 
            value: user,
            stringify: true
        })
    }

    return (dispatch) => {
        dispatch({
            type: UserConstants.ADD_USER,
            payload: user
        })
    }
}

function removeUser() {
    if (!! storageService.getItem({item: 'user'})) {
        
        storageService.removeItem({
            item: 'user'
        })
    }

    return (dispatch) => {
        dispatch({
            type: UserConstants.REMOVE_USER,
        })
    }
}

export {addUser, removeUser}