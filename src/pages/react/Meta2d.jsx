import React from "react";
import "./Meta2d.css";
import '../../../public/js/meta2d'
import { setLocalStorage, getLocalStorage } from "@/utils/utils";
let meta2d = null;
export default class Meta2d extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      them: getLocalStorage('theme'),
      width:document.getElementById("meta2d")?.offsetWidth,
    }
  }


  componentDidMount() {
    meta2d = new window.Meta2d("meta2d");
    window.registerCommonDiagram();
    this._fetch("/json/data1.json", function (text) {
      var data = JSON.parse(text);
      data.locked = 1;
      meta2d.open(data);
      meta2d.fitView(false);
    })
  }
  componentDidUpdate(props,state) {
    console.log(getLocalStorage('theme'),this.state.them);
    
    if(getLocalStorage('theme') !== this.state.them||document.getElementById("meta2d")?.offsetWidth!==this.state.width){
      state.them=getLocalStorage('theme');
    // console.log(document.getElementById("meta2d").offsetWidth,this.state.width,122);
    this.state.width=document.getElementById("meta2d").offsetWidth;
      state.them==='default'?
      this._fetch("/json/data.json", function (text) {
        var data = JSON.parse(text);
        data.locked = 1;
        meta2d.open(data);
        meta2d.fitView(false);
      }):
      this._fetch("/json/data1.json", function (text) {
        var data = JSON.parse(text);
        data.locked = 1;
        meta2d.open(data);
        meta2d.fitView(false);
      })
     
    }
  }


  componentWillUnmount() {
    meta2d?.destroy();
  }

  _fetch(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        cb && cb(xhr.responseText);
      }
    };
  }

  render() {
    return (
      <div className="contentss" style={{width:'100%'}}>
        <div id="meta2d"  style={{width:`${this.state.width}px`}}></div>
      </div>
    );
  }
}
