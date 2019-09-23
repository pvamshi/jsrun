import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'util/auth';
import { Gist } from './Gist';
import { useGistStore } from '../GistStore';
import { useStore } from 'outstated';

export const GistListContainer = React.memo(function GistListContainer() {
  // const [gists, setGists] = useState([]);
  const { token } = useContext(AuthContext) || {};
  const { gists, updateGists } = useStore(useGistStore);
  // updateGists(res);
  useEffect(() => {
    if (!token || gists) {
      return;
    }
    async function fetchGists() {
      try {
        const response = await fetch('https://api.github.com/gists', {
          headers: { Authorization: `token ${token}` }
        });
        updateGists(response.status > 400 ? [] : await response.json());
      } catch (e) {
        updateGists([]);
      }
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchGists();
  }, [token, gists, updateGists]);

  return (
    gists &&
    gists
      .filter(
        g =>
          Object.keys(g.files).length > 0 &&
          Object.values(g.files).some(f => f.language === 'JavaScript')
      )
      .map(gist => <Gist key={gist.id} gist={gist} selectGist={() => {}} />)
  );
});
