import React from "react";

export const AuthContext = React.createContext(null);

export const GITHUB_USER = "github-user";

export async function getUser() {
  const githubUserStr = localStorage.getItem(GITHUB_USER);
  if (githubUserStr) {
    return JSON.parse(githubUserStr);
  } else {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
      try {
        const response = await fetch(
          "http://localhost:9999/authenticate/" + code
        );
        const { token } = await response.json();
        const response2 = await fetch("https://api.github.com/user", {
          headers: { Authorization: `token ${token}` }
        });
        if (response2.status > 400) {
          throw new Error("Unauthorized");
        }
        const user = Object.assign(await response2.json(), { token });
        localStorage.setItem(GITHUB_USER, JSON.stringify(Object.assign(user)));

        return user;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
