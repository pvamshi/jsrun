import React, { useEffect, useState } from 'react';
import { User } from './User';
import { GistListContainer } from '../GistListContainer';
import { AuthContext, getUser } from '../util/auth';
import { App } from './App';
import { EditorContainer } from '../EditorContainer';

import { useGistStore } from '../GistStore';
import { FocusStyleManager } from '@blueprintjs/core';
import { Provider } from 'outstated';

FocusStyleManager.onlyShowFocusOnTabs();

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
      <Provider stores={[useGistStore]}>
        <App
          SidenavContents={GistListContainer}
          Main={EditorContainer}
          User={User}
        />
      </Provider>
    </AuthContext.Provider>
  );
});
