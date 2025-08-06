/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

const SmallButton = styled.button`
  background: Bisque;
  font-size: 0.8em;
  margin: 0.1em 0.25em 0.1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <SmallButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </SmallButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <SmallButton onClick={toggleVisibility}>cancel</SmallButton>
      </div>
    </div>
  )
})

export default Togglable
