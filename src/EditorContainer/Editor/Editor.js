import React, { Component } from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/tomorrow";
import { Button } from "grommet";
import { Run } from "grommet-icons";

/**
 * TODO: Replace this with functional component commented below. With the current commented code there is an issue when
 * cmd+Enter is run after updating the content
 */
export class Editor extends Component {
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
    const externalContent = nextProps.externalContent;
    // const selectedGist = nextProps.selectedGist;
    if (externalContent && externalContent !== this.state.content) {
      this.setState({ content: externalContent });
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
//
// export const Editor = React.memo(function Editor({ externalContent }) {
//   const [content, setContent] = useState(
//     `// Open dev tools to see the output
// console.log('Hello World');`
//   );
//   const [iframe, setIframe] = useState(null);
//   useEffect(() => {
//     if (externalContent) {
//       setContent(externalContent);
//     }
//   }, [externalContent]);
//   const run = () => {
//     const contentDoc = iframe.contentWindow;
//     contentDoc.eval(content);
//   };
//   return (
//     <div>
//       <iframe
//         title={"dummy"}
//         style={{ display: "none" }}
//         ref={r => setIframe(r)}
//       >
//         {" "}
//       </iframe>
//       {iframe && (
//         <AceEditor
//           mode="javascript"
//           theme="tomorrow"
//           onChange={content => setContent(content)}
//           name="js-editor"
//           value={content}
//           focus={true}
//           editorProps={{ $blockScrolling: true }}
//           width={"100%"}
//           commands={[
//             {
//               // commands is array of key bindings.
//               name: "Execute", //name for the key binding.
//               bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" }, //key combination used for the command.
//               exec: () => run() //function to execute when keys are pressed.
//             }
//           ]}
//         />
//       )}
//       <Button onClick={() => run()} primary icon={<Run />} label={"Run"} />
//     </div>
//   );
// });
//
