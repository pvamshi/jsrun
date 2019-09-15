import React from "react";
import {Box, Button, Grid, Grommet, Text} from "grommet/es6";

const THEME = Object.freeze({
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "14px"
    }
  }
});
export const App = React.memo(function HomeLayout({
  showLeftNav,
  children: [rightIcon, leftNav, mainContent]
}) {
  return (
    <Grommet full theme={THEME}>
      <Grid
        fill
        rows={["auto", "flex"]}
        columns={["auto", "flex"]}
        areas={[
          { name: "header", start: [0, 0], end: [1, 0] },
          { name: "sidebar", start: [0, 1], end: [0, 1] },
          { name: "main", start: [1, 1], end: [1, 1] }
        ]}
      >
        <Box
          gridArea="header"
          direction="row"
          align="center"
          justify="between"
          pad={{ horizontal: "medium", vertical: "small" }}
          background="brand"
        >
          <Button>
            <Text size="large">Run JS</Text>
          </Button>
          {rightIcon}
        </Box>
        {showLeftNav && (
          <Box
            gridArea="sidebar"
            background="light-6"
            width="small"
            animation={[
              { type: "fadeIn", duration: 300 },
              { type: "slideRight", size: "xlarge", duration: 150 }
            ]}
          >
            {leftNav}
          </Box>
        )}
        <Box gridArea="main">{mainContent}</Box>
      </Grid>
    </Grommet>
  );
});
