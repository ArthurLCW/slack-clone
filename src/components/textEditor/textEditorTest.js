import './textEditor.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Slate, Editable, withReact } from 'slate-react'
import { Avatar, Button, Icon, SvgIcon } from '@material-ui/core'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function TextEditor(props) {
  // const [editor] = useState(() => withReact(createEditor()))

  return (
    <div className='user__chatInput'>
      <form>
        <input
          placeholder={`Message ${props.user?.name.toLowerCase()}`}
          value={props.message}
          onChange={(e) => props.setMessage(e.target.value)}
        />
        <button type="submit" onClick={(e) => props.onSubmit(e)}>
          SEND
        </button>
      </form>

      <div className='user__chat__function'>
        <SvgIcon component={EmojiEmotionsIcon} onClick={() => {
          props.setShowPicker(!props.showPicker)
          console.log("Show picker state: ", props.showPicker)  
        }}/>
      </div>
      

    </div>
  )
}

export default TextEditor

