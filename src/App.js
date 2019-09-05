import React, { Component } from "react";
import "./App.css";

import { Box, Button, Grid, Grommet, Text } from "grommet";
import User from "./User";
import Editor from "./Editor";
import Gist from "./Gist";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined
    };
    this.updateToken = this.updateToken.bind(this);
  }

  // componentDidMount() {
  // const code = window.location.href.match(/\?code=(.*)/) &&
  //   window.location.href.match(/\?code=(.*)/)[1];
  // console.log(code);
  // if (code) {
  //   fetch('http://localhost:9999/authenticate/' + code).then(re => re.json())
  //     .then(r => {
  //       console.log({ r });
  //       fetch('https://api.github.com/gists', { headers: { 'Authorization': `token ${r.token}` } })
  //         .then(r => r.json()).then(res => {
  //           console.log({ res });
  //         })
  //     });
  // }
  // }
  //
  // {
  //
  // <div className="App">
  // {/*<a href={this.url}>Auth</a>*/}
  // <Editor />
  // </div>
  // }

  updateToken(token) {
    this.setState({
      token
    });
  }

  render() {
    return (
      <Grommet full theme={theme}>
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["auto", "flex"]}
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "sidebar", start: [0, 1], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] }
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: "medium", vertical: "small" }}
            background="brand"
          >
            <Button>
              <Text size="large">Run JS</Text>
            </Button>
            <User updateToken={this.updateToken} />
          </Box>
          {this.state.token && (
            <Box
              gridArea="sidebar"
              background="light-6"
              width="small"
              animation={[
                { type: "fadeIn", duration: 300 },
                { type: "slideRight", size: "xlarge", duration: 150 }
              ]}
            >
              <Gist token={this.state.token} />
            </Box>
          )}
          <Box gridArea="main">
            <Editor />
          </Box>
        </Grid>
      </Grommet>
    );
  }
}
export default App;
