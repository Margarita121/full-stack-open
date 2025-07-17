import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if ( filter ) {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }
    return anecdotes
  })

  return(
    <div>
      <h2>Anecdotes</h2>
            {anecdotes.sort((secondItem, firstItem) => firstItem.votes - secondItem.votes).map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
                </div>
              </div>
            )}
    </div>
  )
}

export default AnecdoteList