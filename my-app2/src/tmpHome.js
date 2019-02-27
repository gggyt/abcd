import React from 'react';
import { Modal, Button } from 'antd';
import {UploadImg1} from './config/router.js';      
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './back/static/my/css/home.css';
import routes from './back/config/backHomeConf';
import Back from './static/images/blog-1.jpg';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'react-avatar-editor';
import { Upload, Icon } from 'antd';
function convertBase64UrlToBlob(urlData){
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/png'});
}
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
class TestHomp extends React.Component {
  state = { visible: false }
  constructor(props) {
    super(props);
    this.state = {
      src: ""
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: files[0] });
    };
    reader.readAsDataURL(files[0]);
  }
  onClickSave = () => {
    if (this.editor) {
            const canvas = this.editor.getImage();
            console.log(canvas);
            const canvasScaled = this.editor.getImageScaledToCanvas();
            alert(canvas);
             var image = new Image();  
    // canvas.toDataURL 返回的是一串Base64编码的URL
    // 指定格式 PNG  
            image.crossOrigin = "*";
      image =canvas.toDataURL("image/jpeg", 0.8);
     alert(image);
      const formData = new FormData()
     formData.append('myFileName', dataURLtoFile(image, 'xx.jpg'));
      fetch(UploadImg1,{   //Fetch方法
      method: 'POST',
      headers: {
      },
      body: formData
      }).then(res => res.json()).then(
        data => {
          this.setState({imageUrl: data.data});
          this.setState({loading: false});
          window.alert(data.msg);
                
      })
    }
    this.setState({
      visible: false,
    });
  }
  setEditorRef = (editor) => this.editor = editor
  onAvatarUpload=() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgFile = e.target.result;
      this.setState({
        originImg: imgFile,
      });
    };
    reader.readAsDataURL(this.file.input.files[0]);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.onClickSave}
          onCancel={this.handleCancel}
        >
          <input type="file" className="default" onChange={this.onChange} />
         <AvatarEditor
        image={this.state.src}
        width={200}
        height={200}
        color={[248, 249, 250, 0.8]}
        scale={1.0}
        rotate={0}
        style={{  margin: '0 5px' }}
          ref={this.setEditorRef}
          url={UploadImg1}
          useCORS = {true}
      	/>
        </Modal>
      </div>
    );
  }
}

export default TestHomp;