import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  // 获取富文本
  getRichText = () => {
    const { editorState } = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  // 展示富文本
  setRichText = (detail) =>{
    const contentBlock = htmlToDraft(detail);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState
      })
  }
}

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          editorStyle={
            { border: '1px solid black',
              paddingLeft:'10px',
              lineHeight:'10px',
              minHeight:'200px'
            }
          }
        />
      </div>
    );
  }
}