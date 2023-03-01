import './textEditor.css'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { createEditor, Transforms, Editor, Text, Node } from 'slate'
import { Link, useParams } from 'react-router-dom'
import { Slate, Editable, withReact } from 'slate-react'
import { Avatar, Button, Icon, SvgIcon } from '@material-ui/core'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import SendIcon from '@material-ui/icons/Send';


// Define a serializing function that takes a value and returns a string.
const serialize = value => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map(n => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  )
}

// Define a deserializing function that takes a string and returns a value.
const deserialize = string => {
  // Return a value array of children derived by splitting the string.
  return string.split('\n').map(line => {
    return {
      children: [{ text: line }],
    }
  })
}

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      // { match: n => Editor.isBlock(editor, n) }
    )
  },
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]




function TextEditor(props) {
  const [editor] = useState(() => withReact(createEditor()))
  // const initialValue = useMemo(
  //   () => (deserialize(localStorage.getItem('content')) || ''),
  //   []
  // )

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <div className='user__chatInput'>
      {/* <form>
        <input
          placeholder={`Message ${props.user?.name.toLowerCase()}`}
          value={props.message}
          onChange={(e) => props.setMessage(e.target.value)}
        />
        <button type="submit" onClick={(e) => props.onSubmit(e)}>
          SEND
        </button>
      </form> */}

      <Slate 
        editor={editor} 
        value={initialValue}
        onChange={value => {
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
          )
          if (isAstChange) {
            // Serialize the value and save the string value to Local Storage.
            console.log("JSON array0: ", value) // Notice! The structure of this JSON is 
            console.log("JSON array1: ", serialize(value)) 
            // localStorage.setItem('content', serialize(value))
          }
        }}
      >

        <div className="rich_editor">
          <Editable
            editor={editor}

            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={event => {
              if (!event.ctrlKey) {
                return
              }

              switch (event.key) {
                case '`': {
                  event.preventDefault()
                  CustomEditor.toggleCodeBlock(editor)
                  break
                }

                case 'b': {
                  event.preventDefault()
                  CustomEditor.toggleBoldMark(editor)
                  break
                }
              }
            }}
          />
        </div>

        <div className='user__chat__function'>
          <SvgIcon component={EmojiEmotionsIcon} onClick={() => {
            props.setShowPicker(!props.showPicker)
            console.log("Show picker state: ", props.showPicker)  
          }}/>
          <SvgIcon component={FormatBoldIcon} 
            onClick={event => {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
            }}/>
          <SvgIcon component={FormatItalicIcon} />
          <SvgIcon component={SendIcon} 
            onClick={(e) => props.onSubmit(e)}/>
        </div>
      </Slate>
      
    </div>
  )
}


const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}



export default TextEditor

