import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../util/auth";
import { Editor } from "./Editor";

export const EditorContainer = React.memo(function EditorContainer({
  selectedGist
}) {
  const { token } = useContext(AuthContext) || {};
  const [ content, setContent ] = useState(null);
  useEffect(() => {
    async function fetchGistContent() {
      if (selectedGist && selectedGist.id && token) {
        try {
          const response = await fetch(
            "https://api.github.com/gists/" + selectedGist.id,
            {
              headers: { Authorization: `token ${token}` }
            }
          );
          if (response.status > 400) {
            throw new Error("Unauthorized");
          }
          const gist = await response.json();
          const file = gist.files[selectedGist.filename];
          setContent(file.content);
        } catch (e) {}
      }
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchGistContent();
  }, [selectedGist, token]);
  return <Editor externalContent={content} />;
});
