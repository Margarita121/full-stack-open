/* eslint-disable no-case-declarations */
import { createSlice, current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log('anecdote state')
      console.log(current(state))
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedVotes = anecdoteToChange.votes + 1
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: changedVotes
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer