import React, { useEffect, useState } from "react";
import { User } from "./User";
import { GistListContainer } from "../GistListContainer";
import { AuthContext, getUser } from "../util/auth";
import { App } from "./App";
import { EditorContainer } from "../EditorContainer";

import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

const Main = React.memo(function Main({ className }) {
  return (
    <main className={className}>
      <EditorContainer />
    </main>
  );
});
export const AppContainer = React.memo(function AppContainer() {
  // const [selectedGist, setSelectedGist] = useState({});
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
      <App SidenavContents={GistListContainer} Main={Main} User={User} />
    </AuthContext.Provider>
  );
});
