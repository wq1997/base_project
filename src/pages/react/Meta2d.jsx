import React from "react";
import "./Meta2d.css";
import '../../../public/js/meta2d'
let meta2d = null;
export default class Meta2d extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    meta2d = new window.Meta2d("meta2d");
    window.registerCommonDiagram();
    this._fetch("/json/data.json", function (text) {
      var data = JSON.parse(text);
      data.locked = 1;
      meta2d.open(data);
      meta2d.fitView(false);
    });
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
      <div className="contentss">
        <div id="meta2d"></div>
      </div>
    );
  }
}
