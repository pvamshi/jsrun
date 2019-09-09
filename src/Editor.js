import React, { Component } from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/tomorrow";
import { Button } from "grommet";
import { Run } from "grommet-icons";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.iframe = undefined;
    this.state = {
      content: `// Open dev tools to see the output
 console.log('Hello World');`
    };
    this.run = this.run.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }
  updateCode(ev) {
    this.setState({ content: ev });
  }
  run() {
    const contentDoc = this.iframe.contentWindow;
    contentDoc.eval(this.state.content);
  }

  async componentWillUpdate(nextProps, nextContext) {
    const selectedGist = nextProps.selectedGist;
    if (
      selectedGist &&
      this.props.token &&
      (!this.props.selectedGist ||
        this.props.selectedGist.id !== selectedGist.id)
    ) {
      const response = await fetch(
        "https://api.github.com/gists/" + selectedGist.id,
        {
          headers: { Authorization: `token ${this.props.token}` }
        }
      );
      const gist = await response.json();
      const file = gist.files[selectedGist.filename];
      this.setState({ content: file.content });
    }
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          onChange={this.updateCode}
          name="js-editor"
          value={this.state.content}
          focus={true}
          editorProps={{ $blockScrolling: true }}
          width={"100%"}
          commands={[
            {
              // commands is array of key bindings.
              name: "Execute", //name for the key binding.
              bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" }, //key combination used for the command.
              exec: this.run //function to execute when keys are pressed.
            }
          ]}
        />
        <Button onClick={this.run} primary icon={<Run />} label={"Run"} />
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
