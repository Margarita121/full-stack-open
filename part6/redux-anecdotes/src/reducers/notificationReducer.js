/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = {content: null}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationAtStart,
  reducers: {
    setNotification(state, action) {
      const newNotification = action.payload
      state.content = newNotification
      return state
    },
    removeNotification(state) {
      state.content = null
      return state
    }
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer