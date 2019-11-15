import {types} from './types'

export const set_user_to_track = userDetails => ({
    type:types.SET_USER_TO_TRACK,
    payload:userDetails
})

export const setAdminLoggedIn = email => ({
    type:types.SET_ADMIN_LOGGED_IN,
    payload:email
})