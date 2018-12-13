import React from 'react'

import E from 'wangeditor'

class Test extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        editorContent: ''
      }
  }
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div ref="editorElem" style={{textAlign: 'left'}}>
        </div>

        <button onClick={this.clickHandle.bind(this)}>获取内容</button>
      </div>
    );
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
	 editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
	 editor.customConfig.uploadFileName = 'myFileName';
	editor.customConfig.uploadImgServer = 'http://localhost:9999/uploadImg';
	alert('xx');
	editor.customConfig.uploadImgHooks = { 
		customInsert: function (insertImg, result, editor) { 
		var url =result.data; insertImg(url); 
		} 
	};

    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.create()
  }
  clickHandle() {
      alert(this.state.editorContent)
  }
}

export default Test;