import {
    Box,
    Flex,
    Heading,
    Spacer,
    Container,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components";

// Functio to generate and return header component
export function AppHeader() {
    return (
        <Container minWidth="90%" maxWidth="90%" left={"10%"} marginTop="2vh">
          <Flex minWidth='100%' alignItems='center' gap='2'>
            <Box p='2'>
              <Heading size='lg'>Develop Test - Q1 Frontend</Heading>
            </Box>
            <Spacer />
            <ColorModeSwitcher justifySelf="flex-end"/>
          </Flex>
        </Container>
    );
}