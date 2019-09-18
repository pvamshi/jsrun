import React, { useContext } from "react";
import { Anchor, Image } from "grommet";
import { Github } from "grommet-icons";
import { AuthContext } from "util/auth";

const URL =
  "https://github.com/login/oauth/authorize?client_id=5baaa09a82442f96fb0d&" +
  "scope=gist&" +
  "redirect_uri=https://jsrun.dev";

export const User = React.memo(function User() {
  const user = useContext(AuthContext);
  return user ? (
    <Image src={user.avatar_url} style={{ height: "40px" }} />
  ) : (
    <Anchor href={URL} label={"Log in "} icon={<Github />} />
  );
});
