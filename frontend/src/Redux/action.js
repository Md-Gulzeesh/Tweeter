import { DELETE_USER, EDIT_USER, GET_POSTS, GET_USER, USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from "./actionType"

export const userLogin = (payload)=>{
    return {type:USER_LOGIN,payload:payload}
}
export const userSignup = (payload)=>{
    return {type:USER_SIGNUP,payload:payload}
}
export const userLogout = (payload)=>{
    return {type:USER_LOGOUT,payload:payload}
}
export const getUser = (payload)=>{
    return {type:GET_USER,payload:payload}
}
export const getPosts = (payload)=>{
    return {type:GET_POSTS,payload:payload}
}

export const deleteUser = (payload)=>{
    return {type:DELETE_USER,payload:payload}
}
export const editUser = (payload)=>{
    return {type:EDIT_USER,payload:payload}
}