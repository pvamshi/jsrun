import React, { Fragment, useContext, useState } from "react";
import "./App.css";
import { css } from "emotion";
import {
  Alignment,
  Button,
  Card,
  Elevation,
  H3,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Position,
  Tooltip
} from "@blueprintjs/core";
import { AuthContext } from "../../util/auth";

export const App = React.memo(function HomeLayout({
  SidenavContents,
  Main,
  User
}) {
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
    width: ${token && showLeftNav ? 250 : 16}px;
    height: calc(100vh - ${headerHeight}px);
    overflow: auto;
    position: relative;
    padding: ${showLeftNav ? 20 : 0}px;
  `;
  const seperatorClass = css`
    position: absolute;
    left: ${token && showLeftNav ? 233 : 4}px;
    top: 48vh;
    transform: rotate(${showLeftNav ? 0 : 180}deg);
    & button:hover {
      background: none !important;
    }
  `;
  const mainClass = css`
    flex-grow: 2;
    overflow: auto;
    padding-left :10px;
  `;
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
      <section className={sectionClass}>
        {token && (
          <Card elevation={Elevation.TWO} className={asideClass}>
            <section
              className={css`
                width: 200px;
                position: absolute;
                right: ${showLeftNav ? 0 : 40}px;
              `}
            >
              <SidenavContents />
            </section>
          </Card>
        )}
        <Main className={mainClass} />
        <section className={seperatorClass}>
          <Tooltip
            content={showLeftNav ? "Hide (Cmd+[)" : "Show (Cmd+[)"}
            position={Position.RIGHT}
          >
            <Button
              onClick={() => setShowLeftNav(!showLeftNav)}
              icon={"one-column"}
              minimal={true}
            />
          </Tooltip>
        </section>
      </section>
    </Fragment>
  );
});
