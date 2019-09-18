import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "util/auth";
import { Gist } from "./Gist";

export const GistListContainer = React.memo(function GistListContainer() {
  const [gists, setGists] = useState([]);
  const { token } = useContext(AuthContext) || {};
  useEffect(() => {
    async function fetchGists() {
      const response = await fetch("https://api.github.com/gists", {
        headers: { Authorization: `token ${token}` }
      });
      setGists(await response.json());
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchGists();
  }, [token]);
  return (
    gists &&
    gists
      .filter(
        g =>
          Object.keys(g.files).length > 0 &&
          Object.values(g.files).some(f => f.language === "JavaScript")
      )
      .map(gist => <Gist key={gist.id} gist={gist} selectGist={() => {}} />)
  );
});
