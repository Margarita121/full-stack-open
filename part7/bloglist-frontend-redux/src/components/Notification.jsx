import { useSelector } from 'react-redux'
import styled from 'styled-components'

const CustomNotification = styled.div`
  padding: 1em;
  font-size: 1em;
  background: mistyrose;
`

const Notification = () => {
  const notification = useSelector(({ notification }) => notification.content)
  if (!notification) {
    return null
  }

  return <CustomNotification>{notification}</CustomNotification>
}

export default Notification
