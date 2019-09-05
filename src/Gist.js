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
    console.log(gists);
  }

  render() {
    return this.state.gists.map(g =>
      Object.keys(g.files)
        .filter(filename => filename.endsWith(".js"))
        .map((fileName, index) => (
          <Button key={fileName + index} href="#" hoverIndicator>
            <Box pad={{ horizontal: "medium", vertical: "small" }}>
              <Text>{fileName}</Text>
            </Box>
          </Button>
        ))
    );
  }
}
export default Gist;
