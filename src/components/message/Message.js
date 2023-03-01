import './Message.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, IconButton, SvgIcon } from '@material-ui/core'
import Moment from 'react-moment'
import 'moment-timezone'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Picker from 'emoji-picker-react';


function Message({ uid, name, avatar, message, timestamp }) {
  const [hovered, setHovered] = useState(false)
  const [showPicker, setShowPicker] = useState(false)  
  const [reactions, setReactions] = useState([])

  const toggleHover = () => {
    setHovered(!hovered)
    // console.log("Hovering state toggled. ")
  }

  const toggleShow = () => {
    setHovered(true)
    // console.log("Hovering state toggled. ")
  }

  const toggleHide = () => {
    setHovered(false)
    // console.log("Hovering state toggled. ")
  }

  const onEmojiClick = ( emojiObject, event) => {
    // console.log("prev reactions: ", reactions)
    // console.log("current emoji: ",emojiObject.emoji)
    setReactions([...reactions, emojiObject.emoji])
    setShowPicker(false)
    // console.log("cur reactions: ", reactions)
  }

  // Moment.globalTimezone = 'America/Los_Angeles'

  function ChatWidget() {
    // console.log("Widget activated.")
    return (
      <div className='chat__toolbar'>
        <SvgIcon component={EmojiEmotionsIcon} onClick={()=>{
          setShowPicker(!showPicker)
        }} />
      </div>
    )
  }

  const reactionsPairs = reactions.reduce((pairs, cur) => {
    if (pairs[cur]){
      pairs[cur] += 1
    }else{
      pairs[cur] = 1
    }
    return pairs
  }, [])

  const ReactionBar= () => {
    // console.log("reaction pairs: ", reactionsPairs)
    return (
      <div className='reaction__bar'>{
        Object.keys(reactionsPairs).map((reaction) => {
          return (
            <div className='reaction'>
              <span>{reaction}</span>
              <span>{reactionsPairs[reaction]}</span>
            </div>
          );
        })
      }</div>
    )
  }


  return (
    <div>
      <div
        className="message"
        onMouseEnter={toggleShow}
        onMouseLeave={toggleHide}
      >
        <div className="message__data">
          <div className="message__left">
            <Avatar
              className="message__avatar"
              src={avatar}
              alt={`${name} ${uid} - Image`}
            />
          </div>
          <div className="message__right">
            <div className="message__details">
              <Link to={`/users/${uid}`}>{name}</Link>
              <small>
                <Moment unix date={timestamp} format="YYYY-MM-D hh:mm A" />
              </small>
            </div>
            <p className="message__text">{message}</p>
          </div>
        </div>

        <div>
          {hovered && <ChatWidget/>}
        </div>

        <div className='emoji__picker__msg'>
          {showPicker && <Picker onEmojiClick={onEmojiClick}/>} 
        </div>
      </div>
      <ReactionBar/>
    </div>

    
  )
}

export default Message
