import './SidebarOption.css'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

function SidebarOption({
  Icon,
  title,
  sub,
  id,
  addChannelOption,
  user,
  avatar,
  online,
  expandHandler,
}) {
  const history = useHistory()
  const selectChannel = () => {
    // console.log("select channel.")
    if (id) {
      if (user) {
        history.push(`/users/${id}`)
      } else {
        history.push(`/channels/${id}`)
      }
    } else {
      history.push(title)
    }

    if (expandHandler) {
      expandHandler()
    }
  }

  const addChannel = () => {
    // console.log("add channel.")
    history.push('/add/channel')
  }

  return (
    <div
      className={`sidebarOption ${online} ${sub}`}
      onClick={addChannelOption ? addChannel : selectChannel}
    >

      {avatar ? (
        <div className='direct__message__user'>
          <div className='icon'>
            {Icon && <Icon className="sidebarOption__icon" />}
          </div>
          {avatar && <Avatar src={avatar} />}
          <h3>{title}</h3>
        </div>
      ) : (
        <>
        {Icon && <Icon className="sidebarOption__icon" />}
        {Icon ? (
            <h3>{title}</h3>
        ) : (
          <h3 className="sidebarOption__channel">
            <span className="sidebarOption__hash">#</span> {title}
          </h3>
        )}</>
      )}


      {/* {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <>
          {avatar && <Avatar src={avatar} />}
          <h3>{title}</h3>
        </>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span> {title}
        </h3>
      )} */}
    </div>
  )
}

export default SidebarOption
