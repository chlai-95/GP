import {
    Container,
    Center,
} from "@chakra-ui/react";
import { Component } from "react";
import { UserTable } from "./components/userTable";

// Generate main views in app User
class UserApp extends Component {
    render() {
        return (
            <Center m="0" p="1">
                <Container maxW="90%">
                    <UserTable />
                </Container>
            </Center>
        );
    }
}

export { UserApp };