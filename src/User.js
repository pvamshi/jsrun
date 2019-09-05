import React, { Component } from "react";
import { Anchor, Image } from "grommet";
import {Github} from "grommet-icons";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
    this.user = undefined;
    this.url =
      "https://github.com/login/oauth/authorize?client_id=24fb42a0ececca0854b7&" +
      "scope=gist&" +
      "redirect_uri=http://localhost:3000";
  }
  async componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      try {
        const response = await fetch(
          "http://localhost:9999/authenticate/" + code
        );
        const { token } = await response.json();
        this.props.updateToken(token);
        const response2 = await fetch("https://api.github.com/user", {
          headers: { Authorization: `token ${token}` }
        });
        if (response2.status > 400) {
          throw new Error("Unauthorized");
        }
        const user = await response2.json();

        this.setState({ user });
      } catch (e) {}
      // console.log({ token });
      // .then(re => re.json())
      // .then(r => {
      //   console.log({ r });
      //   fetch("https://api.github.com/user", {
      //     headers: { Authorization: `token ${r.token}` }
      //   })
      //     .then(r => r.json())
      //     .then(res => {
      //       console.log({ res });
      //     });
      //   fetch("https://api.github.com/gists", {
      //     headers: { Authorization: `token ${r.token}` }
      //   })
      //     .then(r => r.json())
      //     .then(res => {
      //       console.log({ res });
      //     });
      // })
      // .catch(err => {
      //   console.log("Ignore error");
      // });
    }
  }

  render() {
    return this.state.user ? (
      <Image src={this.state.user.avatar_url} style={{ height: "40px" }} />
    ) : (
      <Anchor href={this.url} label="Log in" icon={<Github/>}/>
    );
  }
}
export default User;
