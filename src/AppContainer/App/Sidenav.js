import React, { useContext, useState } from "react";
import "./App.css";
import { css } from "emotion";
import { Button, Card, Elevation, Position, Tooltip } from "@blueprintjs/core";
import { AuthContext } from "../../util/auth";

export const Sidenav = React.memo(function Sidenav({
  SidenavContents,
  MainContents,
  headerHeight
}) {
  const { token } = useContext(AuthContext) || {};
  const [showLeftNav, setShowLeftNav] = useState(true);
  const containerClass = css`
    display: flex;
    align-items: stretch;
    overflow: hidden;
    height: calc(100vh - ${headerHeight}px);
    top: ${headerHeight}px;
    width: 100%;
  `;

  const asideClass = css`
    width: ${token && showLeftNav ? 250 : 16}px;
    overflow: auto;
    padding: ${showLeftNav ? 20 : 0}px;
    position: relative;
  `;
  const mainClass = css`
    flex-grow: 2;
    overflow: auto;
    padding-left: 10px;
  `;
  const separatorClass = css`
    position: absolute;
    left: ${token && showLeftNav ? 233 : 4}px;
    top: 48vh;
    transform: rotate(${showLeftNav ? 0 : 180}deg);
    & button:hover {
      background: none !important;
    }
  `;
  return (
    <div className={containerClass}>
      <Card elevation={Elevation.TWO} className={asideClass}>
        <div
          className={css`
            width: 200px;
            position: absolute;
            right: ${showLeftNav} ? 0 : 40}px;
          `}
        >
          {/*{SidenavContents && <SidenavContents />}*/}
        </div>
      </Card>
      <main className={mainClass}>
        <MainContents />
      </main>
      <div className={separatorClass}>
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
      </div>
    </div>
  );
});
