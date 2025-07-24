import { useNotificationDispatch } from '../NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient =  useQueryClient() 
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: () => {
      dispatch({type:'SET', payload:'too short anecdote, must have length 5 or more'})
      setTimeout(() => {
        dispatch({type:'REMOVE'})
      }, 5000)
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })
  
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({type:'SET', payload:`You added ${content}`})
    setTimeout(() => {
        dispatch({type:'REMOVE'})
      }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
