import React, { Component } from "react";
import { Box, Button, Text } from "grommet/es6";

class Gist extends Component {
  constructor(props) {
    super(props);
    this.token = props.token;
    this.state = {
      gists: []
    };
  }
  async componentDidMount() {
    const response = await fetch("https://api.github.com/gists", {
      headers: { Authorization: `token ${this.token}` }
    });
    const gists = await response.json();
    this.setState({ gists });
  }

  render() {
    return this.state.gists
      .filter(
        g =>
          Object.keys(g.files).length > 0 &&
          Object.values(g.files).some(f => f.language === "JavaScript")
      )
      .map(gist => (
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
                onClick={() => this.props.selectGist(file)}
              >
                <Text>{file.filename}</Text>
              </Button>
            ))}
        </Box>
      ));
  }
}
export default Gist;
