import React, { useEffect, useState } from "react";
import { User } from "./User";
import { GistListContainer } from "../GistListContainer";
import { AuthContext, getUser } from "../util/auth";
import { App } from "./App";
import { EditorContainer } from "../EditorContainer";

export const AppContainer = React.memo(function AppContainer() {
  const [selectedGist, setSelectedGist] = useState({});
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchLoggedInUser() {
      setUser(await getUser());
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchLoggedInUser();
  }, []);
  return (
    <AuthContext.Provider value={user}>
      <App showLeftNav={user && user.token}>
        <User />
        <GistListContainer selectGist={gist => setSelectedGist(gist)} />
        <EditorContainer selectedGist={selectedGist} />
      </App>
    </AuthContext.Provider>
  );
});
