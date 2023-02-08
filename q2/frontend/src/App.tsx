import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"
import { AppHeader } from "./components/components";
import { GameApp } from "./apps/games";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="15vh" p={3}>
        <AppHeader />
      </Grid>
    </Box>
    <GameApp />
  </ChakraProvider>
)
