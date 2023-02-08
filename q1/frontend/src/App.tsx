import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"
import { AppHeader } from "./components/header";
import {UserApp} from "./apps/users/index"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="15vh" p={3}>
        <AppHeader />
      </Grid>
    </Box>
    <UserApp />
  </ChakraProvider>
)
