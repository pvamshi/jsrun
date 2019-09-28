import React, { Fragment } from 'react';
import './App.css';
import {
  Alignment,
  H3,
  Navbar,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core';
import { Sidenav } from './Sidenav';

export const App = React.memo(function App({ SidenavContents, Main, User }) {
  // const { token } = useContext(AuthContext) || {};

  return (
    <Fragment>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>
            <H3>JSrun</H3>
          </NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <User />
        </NavbarGroup>
      </Navbar>
      <Sidenav
        headerHeight={50}
        SidenavContents={SidenavContents}
        MainContents={Main}
      />
    </Fragment>
  );
});
