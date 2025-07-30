import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userAtStart = null

const userSlice = createSlice({
  name: 'user',
  initialState: userAtStart,
  reducers: {
    setUser(state, action) {
      blogService.setToken(action.payload.token)
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const loginResponse = await loginService.login(credentials)
    dispatch(setUser(loginResponse))
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(loginResponse)
    )
    blogService.setToken(loginResponse.token)
  }
}

export default userSlice.reducer
