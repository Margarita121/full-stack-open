import { useDispatch, useSelector } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout  } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if ( filter ) {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }
    return anecdotes
  })

  const onClickVote = (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(showNotificationWithTimeout(`You voted ${anecdote.content}`, 2))
  }

  return(
    <div>
      <h2>Anecdotes</h2>
            {[...anecdotes].sort((secondItem, firstItem) => firstItem.votes - secondItem.votes).map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => onClickVote(anecdote)}>vote</button>
                </div>
              </div>
            )}
    </div>
  )
}

export default AnecdoteList