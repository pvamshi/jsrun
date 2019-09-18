import React, { Fragment, useContext, useState } from "react";
import "./App.css";
import { css } from "emotion";
import {
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup
} from "@blueprintjs/core";
import { AuthContext } from "../../util/auth";

export const App = React.memo(function HomeLayout({ Aside, Main, User }) {
  const { token } = useContext(AuthContext) || {};
  const [showLeftNav, setShowLeftNav] = useState(true);
  const headerHeight = 50;
  const sectionClass = css`
    height: calc(100vh - ${headerHeight}px);
    top: ${headerHeight}px;
    width: 100%;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  `;

  const asideClass = css`
    width: ${token && showLeftNav ? 250 : 0}px;
    height: calc(100vh - ${headerHeight}px);
    overflow: hidden;
    visibility: ${showLeftNav ? "visible" : "hidden"}
  `;
  const mainClass = css`
    flex-grow: 2;
    overflow: auto;
  `;
  return (
    <Fragment>
      <Navbar>
        <NavbarGroup>
          {/*<NavbarHeading>Blueprint</NavbarHeading>*/}
          <Button
            onClick={() => setShowLeftNav(!showLeftNav)}
            icon={"folder-close"}
            minimal={true}
            active={showLeftNav}
            disabled={!token}
          >
            Files
          </Button>
          <NavbarDivider />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <User />
        </NavbarGroup>
      </Navbar>
      <section className={sectionClass}>
        {token && <Aside className={asideClass} />}
        <Main className={mainClass} />
      </section>
    </Fragment>
  );
});
