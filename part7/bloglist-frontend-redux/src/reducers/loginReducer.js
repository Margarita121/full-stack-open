import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import localStorageService from '../services/localStorage'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    logIn(state, action) {
      return action.payload
    },
    logOut() {
      return null
    },
  },
})

export const { logIn, logOut } = loginSlice.actions

export const setCurrentUser = (credentials) => {
  return async (dispatch) => {
    const userFromLoginResponse = await loginService.login(credentials)
    localStorageService.saveUser(userFromLoginResponse)
    blogService.setToken(userFromLoginResponse.token)
    dispatch(logIn(userFromLoginResponse))
  }
}

export const removeCurrentUser = () => {
  return async (dispatch) => {
    localStorageService.removeUser()
    blogService.setToken(null)
    dispatch(logOut)
  }
}

export default loginSlice.reducer
