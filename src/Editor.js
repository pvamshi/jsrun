import React, { Component } from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/tomorrow";
import {Button} from "grommet";
import {Run} from "grommet-icons";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.iframe = undefined;
    this.code = "";
    this.run = this.run.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }
  updateCode(ev) {
    // console.log(ev.target.value);
    this.code = ev;
  }
  run() {
    const contentDoc = this.iframe.contentWindow;
    contentDoc.eval(this.code);
  }
  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          onChange={this.updateCode}
          name="js-editor"
          defaultValue={this.code}
          focus={true}
          editorProps={{ $blockScrolling: true }}
          width={"100%"}
        />
        <Button onClick={this.run} primary icon={<Run/>} label={"Run"}/>
        <iframe
          title={"dummy"}
          style={{ display: "none" }}
          ref={r => (this.iframe = r)}
        >
          {" "}
        </iframe>
      </div>
    );
  }
}
export default Editor;
