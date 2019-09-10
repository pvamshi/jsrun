import React from "react";
import { Box, Button, Text } from "grommet/es6";

export const Gist = React.memo(function Gist({ gist, selectGist }) {
  return (
    <Box pad="small" key={gist.id}>
      <Text>{gist.description || Object.keys(gist.files)[0]}</Text>

      {Object.values(gist.files)
        .filter(file => file.language === "JavaScript")
        .map(file => Object.assign({}, file, { id: gist.id }))
        .map((file, index) => (
          <Button
            margin="small"
            key={file.filename + index}
            hoverIndicator
            onClick={() => selectGist(file)}
          >
            <Text>{file.filename}</Text>
          </Button>
        ))}
    </Box>
  );
});
