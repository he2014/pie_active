import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Imgaeuploadcompress extends Component {
    static propTypes = {
        number: PropTypes.number,
        txtBtn: PropTypes.string,
        btnClassName: PropTypes.string,
        imageCompress: PropTypes.func,
        url:PropTypes.string,
        filename:PropTypes.string,
    }
    // btnClick = ()=>{
    //     this.ptrs.click();
    // }
    fileChange =(e)=>{
                let xhr =null, 
                form =null, 
                image =null, 
                reand =null,
                _this = this;
             let  file  = e.target.files[0];
              reand = new FileReader();
              image = new Image();
             reand.readAsDataURL(file);
             reand.onload = function(e){
                 image.src = e.target.result;
             }
             image.onload = function(){
                 let canv = null;
                 //保持图片宽高为画布宽高
                 let width = this.width;
                 let height = this.height;
                 let num = _this.props.number|| 0.7;
                 canv =  document.createElement("canvas");
                 canv.height = height;
                 canv.width = width;
                 canv.style = "display:none";
                let context = canv.getContext('2d');
                 //清除画布
                 context.clearRect(0, 0, width, height);
                 // 图片压缩
                  context.drawImage(image, 0, 0, width, height);
                  //转base64 质量压缩
                  let dataUrl = canv.toDataURL(file.type,num);
                  //将base64转换为文件
            let fileData = function dataURLtoFile(dataurl) {
             let  u8arr = null,
              filedatas = null,
              arr = dataurl.split(','),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
             n = bstr.length;
             u8arr = new Uint8Array(n);
            let  fileName = Math.random().toString(16).substr(2)+"."+mime.split("/")[1];
             while(n--){
             u8arr[n] = bstr.charCodeAt(n);
             }
             filedatas = new File([u8arr],fileName , {type:mime});
             return filedatas;
          }
                 form = new FormData();
                 form.append(_this.props.filename,fileData(dataUrl))
                  xhr = new XMLHttpRequest();
                 xhr.open("POST", _this.props.url, true);
                 xhr.onreadystatechange = function(){
                     if(xhr.readyState===4&&xhr.status===200){
                        _this.props.imageCompress(JSON.parse(xhr.responseText))
                     }
                 }
                 xhr.send(form);  
             }
         
    }
  render() {
      const {txtBtn,btnClassName}= this.props;
    return (
      <div style={{position: "relative"}}>
           <a style={{position: "absolute",
                display: "block",
                textDecoration: "none",
                cursor: "pointer",
                textAlign: "center"}} className={btnClassName}>{txtBtn}</a>
        <input accept="image/*" className={btnClassName}  type="file" style={{ position: "absolute", display: "block",opacity: 0}} onChange={this.fileChange} ref={el=>this.ptrs=el} />
      </div>
    )
  }
}
