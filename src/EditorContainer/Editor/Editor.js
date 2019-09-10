import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Button } from "grommet/es6";
import { Run } from "grommet-icons/es6";
import "brace/mode/javascript";
import "brace/theme/tomorrow";

export const Editor = React.memo(function Editor({ externalContent }) {
  const [content, setContent] = useState(
    `// Open dev tools to see the output
console.log('Hello World');`
  );
  const [iframe, setIframe] = useState(null);
  useEffect(() => {
    if (externalContent) {
      setContent(externalContent);
    }
  }, [externalContent]);
  const run = () => {
    const contentDoc = iframe.contentWindow;
    contentDoc.eval(content);
  };
  return (
    <div>
      <iframe
        title={"dummy"}
        style={{ display: "none" }}
        ref={r => setIframe(r)}
      >
        {" "}
      </iframe>
      {iframe && (
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          onChange={content => setContent(content)}
          name="js-editor"
          value={content}
          focus={true}
          editorProps={{ $blockScrolling: true }}
          width={"100%"}
          commands={[
            {
              // commands is array of key bindings.
              name: "Execute", //name for the key binding.
              bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" }, //key combination used for the command.
              exec: () => run() //function to execute when keys are pressed.
            }
          ]}
        />
      )}
      <Button onClick={() => run()} primary icon={<Run />} label={"Run"} />
    </div>
  );
});
