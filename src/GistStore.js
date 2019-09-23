import { useState } from 'react';

export function useGistStore(initialState = null) {
  let [gists, setGists] = useState(initialState);
  let updateGists = gists => setGists(gists);
  return { gists, updateGists };
}

