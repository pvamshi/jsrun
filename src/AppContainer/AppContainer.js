import React, { useEffect, useState } from "react";
import { User } from "./User";
import { GistListContainer } from "../GistListContainer";
import { AuthContext, getUser } from "../util/auth";
import { App } from "./App";
import { EditorContainer } from "../EditorContainer";

const Aside = React.memo(function Aside({ className }) {
  return (
    <aside className={className}>
      <GistListContainer />
    </aside>
  );
});
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
      <App Aside={Aside} Main={Main} User={User}></App>
    </AuthContext.Provider>
  );
});
