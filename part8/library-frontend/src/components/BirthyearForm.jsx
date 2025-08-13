/* eslint-disable react/prop-types */
import { useState } from 'react'
import Select from 'react-select';
import { useMutation } from '@apollo/client'

import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries/'

const BirthyearForm = (props) => {
  // const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedName, setSelectedName] = useState(null);

  const [ editAuthor ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      props.setError(messages)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({  variables: { name: selectedName.value, setBornTo: Number(born) } })

    setBorn('')
  }

  const options = props.authors.map(author => ({
    value: author.name,
    label: author.name
  }))

  return (
    <div>
      <h2>set birthyear</h2>
      <Select
        defaultValue={selectedName}
        onChange={setSelectedName}
        options={options}
      />
      <form onSubmit={submit}>
        {/* <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <div>
          born <input value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm