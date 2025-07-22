/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    
  },
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const updateVote = content => {
  return async dispatch => {

    const changedVotes = content.votes + 1
      const changedAnecdote = { 
        ...content, 
        votes: changedVotes
      }

    await anecdoteService.updateById(changedAnecdote)
    const anecdotes = await anecdoteService.getAll()
    anecdotes.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote 
      )
    dispatch(setAnecdotes(anecdotes))
  }
}
export default anecdoteSlice.reducer