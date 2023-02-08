import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    TableCaption,
    TableContainer,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    Stack,
    Box,
    FormLabel,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast,
    CardBody,
    Card,
    CardHeader,
    Avatar,
    WrapItem,
    Center,
    FormControl
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { cloneDeep } from "lodash";
import { ITableHeader, IUser, IUserRequest } from "../models/models";
import { UserProps, UserTableHeader } from "../user";
import { ISearchQuery, IApiResponse } from "../../../models/models";
import { getUsers, postUser, patchUser, deleteUser } from "../services/user";
import { AddIcon } from "@chakra-ui/icons";
import { UserTableContent } from "./userTableContent";
import { convertImageIntoBase64 } from "../helpers/helpers";

function UserTable() {
    
    // Define a new reference to refer to a boolean value
    let initiate = useRef(false);

    // Define a new reference to refer to a boolean value
    let triggerDelete = useRef(false);

    // Define a new reference to refer to button
    const cancelAlertDialogRef = useRef(null);

    // Define a new reference to refer to an input
    let profilePicInput = useRef<HTMLInputElement>(null);

    // Use Chakra-UI toast component
    const toast = useToast();

    // Deep clone a new set of pre-defined const
    const useUser = cloneDeep(UserProps);

    // Setting up necessary states
    const [tableHeader, setTableHeader] = useState<Array<ITableHeader>>([]);
    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({ limit: 0, skip: 0, order_by: UserTableHeader[0].id, sort_order: "asc" });
    const [users, setUsers] = useState<Array<Array<IUser>>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<Array<IUser>>([]);
    const [updatedUser, setUpdatedUser] = useState<IUserRequest>();
    const [isCreate, setIsCreate] = useState<boolean>(true);
    const [profilePicToShow, setProfilePicToShow] = useState<string>("");

    // Setting up necessary disclosures
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
    const { isOpen: isAlertDialogOpen, onOpen: onAlertDialogOpen, onClose: onAlertDialogClose } = useDisclosure();


    // Handle each TH click event
    const HeaderClick = (id: string) => {
        if (searchQuery.order_by === id && searchQuery.sort_order === "asc") {
            setSearchQuery((prev) => ({ ...prev, order_by: id, sort_order: "desc" }));
        }
        else {
            setSearchQuery((prev) => ({ ...prev, order_by: id, sort_order: "asc" }));
        }
        GetUsers();
    };

    // Handle each TBODY > TR click event
    const ContentClick = useCallback((event: any, user: Array<IUser>) => {
        if (event.detail === 2) {
            if (profilePicToShow !== "") {
                setProfilePicToShow("");
            }
            
            if (user) {
                setIsCreate(false);
                setSelectedUser(user);
                structUpdateUser(user);
                onDrawerOpen();
                refreshProfilePicToShow(user);
            }
        }
    }, [onDrawerOpen, profilePicToShow]);

    // Reset profile pic to current selected user picture
    const refreshProfilePicToShow = (user?: Array<IUser>) => {
        if (user) {
            let idx = user.findIndex(u => u.json_key === "profile_pic");
            if (idx !== -1 && user[idx].value) {
                setProfilePicToShow(user[idx].value);
            }
        }
    };

    // Populating table header with pre-defined properties
    const generateTableHeader = () => {
        setTableHeader(UserTableHeader);
    };

    // Structuring a User for update purpose
    const structUpdateUser = (user?: Array<IUser>) => {
        const _id = user?.find(u => u.json_key === "ID")?.value || "";
        const _name = user?.find(u => u.json_key === "name")?.value || "";
        const _phone = user?.find(u => u.json_key === "phone")?.value || "";
        const _email = user?.find(u => u.json_key === "email")?.value || "";
        const _address_1 = user?.find(u => u.json_key === "address_1")?.value || "";
        const _address_2 = user?.find(u => u.json_key === "address_2")?.value || "";
        const _address_3 = user?.find(u => u.json_key === "address_3")?.value || "";
        const _profile_pic = user?.find(u => u.json_key === "profile_pic")?.value || "";

        let oriUser: IUserRequest = {
            name: _name,
            phone: _phone,
            email: _email,
            address_1: _address_1
        };

        if (_id !== "") {
            oriUser.id = _id
        }

        if (_address_2 !== "") {
            oriUser.address_2 = _address_2
        }

        if (_address_3 !== "") {
            oriUser.address_3 = _address_3
        }

        if (_profile_pic !== "") {
            oriUser.profile_pic = _profile_pic
        }

        setUpdatedUser(oriUser);
    };

    // Start fire API request to get all users data
    const GetUsers = useCallback(() => {
        if (!isLoading) {
            
            // Setting to loading mode
            setIsLoading(true);

            // Reset all the loaded users
            setUsers([]);

            // Define which store to use
            const reqUsers = getUsers(searchQuery);

            // Start firing and await for the response
            reqUsers.then((response: IApiResponse) => {
                // If get success response from API
                if (response.metadata.success) {

                    // Start strucuring data into expected format
                    let allUsers: Array<Array<IUser>> = Object.assign([]);
                    if (response.hits.length > 0) {
                        response.hits.forEach((hit, hit_index) => {
                            let pushAble: number = 0;
                            let new_users: Array<IUser> = cloneDeep(useUser);
                            Object.keys(new_users).map((column, column_index) => {
                                let props = new_users[column_index];
                                props.value = response.hits[hit_index][props.json_key];
                                if (props.value) {
                                    pushAble++;
                                }
                                return pushAble;
                            });
                            if (pushAble > 0) {
                                allUsers.push(new_users);
                            }
                            return pushAble;
                        });

                        if (allUsers.length > 0) {
                            setUsers(allUsers);
                        }
                    }
                }

                // Setting out from loading mode
                setIsLoading(false);
            });
        }
    }, [isLoading, searchQuery, useUser]);

    // Handler for update user button click
    const UpdateUser = (event: ChangeEvent<HTMLInputElement>, target: string) => {
        if (updatedUser) {
            if (event.target.files) {
                convertImageIntoBase64(event.target.files[0], (success: boolean, response: any) => {
                    if (success) {
                        let convertedImage = response;
                        let targetKey = target as keyof IUserRequest;
                        let targetUser = { ...updatedUser }
                        targetUser[targetKey] = convertedImage;
                        setProfilePicToShow(convertedImage);
                        setUpdatedUser(targetUser);
                    }
                    else {
                        // Promt error status toast notification if get error status response from API
                        toast({
                            title: 'Unable to upload image.',
                            description: response,
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        });
                    }
                });
            }
            else {
                let targetKey = target as keyof IUserRequest;
                let targetUser = { ...updatedUser }
                targetUser[targetKey] = event.target.value;
                setUpdatedUser(targetUser);
            }
        }
    };

    // Start fire API request to update particular user
    const submitUpdateUser = async () => {

        // If there is selected user
        if (updatedUser) {

            // If ID found in selected user, which mean the request should be UPDATE instead of CREATE
            if (updatedUser.id) {

                // Define which store to use
                const patchResult = patchUser(updatedUser);

                // Start firing and await for the response
                patchResult.then((resp: IApiResponse) => {

                    // If get success response from API
                    if (resp.metadata.success) {

                        // Promt success status toast notification
                        toast({
                            title: 'User updated.',
                            description: resp.metadata.message,
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        });

                        // Re-fetch all users again to pull latest users
                        GetUsers();

                        // Deselect selected user
                        resettingSelectedUser();
                    }
                    else {

                        // Promt error status toast notification if get error status response from API

                        if (Array.isArray(resp.metadata.message)) {
                            resp.metadata.message.forEach((m) => {
                                let displayMessage;
                                let field = m["FailedField"].split(".", 2)[1].replace("_", " ");

                                if (m["Tag"] === "required") {
                                    displayMessage = `[${field}] is required, please provide some value`;
                                }
                                else {
                                    displayMessage = `[${field}] format mismatch`;
                                }
                                toast({
                                    title: 'Oops.',
                                    description: displayMessage,
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                });
                            })
                        }
                        else {
                            toast({
                                title: 'Oops.',
                                description: resp.metadata.message,
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            });
                        }
                    }
                });
            }
            else {

                // If no ID found in selected user, which mean the request should be CREATE instead of UPDATE
                // Define which store to use
                const postResult = postUser(updatedUser);

                // Start firing and await for the response
                postResult.then((resp: IApiResponse) => {

                    // If get success response from API
                    if (resp.metadata.success) {

                        // Promt success status toast notification
                        toast({
                            title: 'User created.',
                            description: resp.metadata.message,
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        });

                        // Re-fetch all users again to pull latest users
                        GetUsers();

                        // Deselect selected user, to avoid unexpected error
                        resettingSelectedUser();
                    }
                    else {

                        // Promt error status toast notification if get error status response from API

                        if (Array.isArray(resp.metadata.message)) {
                            resp.metadata.message.forEach((m) => {
                                let displayMessage;
                                let field = m["FailedField"].split(".", 2)[1].replace("_", " ");

                                if (m["Tag"] === "required") {
                                    displayMessage = `[${field}] is required, please provide some value`;
                                }
                                else {
                                    displayMessage = `[${field}] format mismatch`;
                                }
                                toast({
                                    title: 'Oops.',
                                    description: displayMessage,
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                });
                            })
                        }
                        else {
                            toast({
                                title: 'Oops.',
                                description: resp.metadata.message,
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            });
                        }
                    }
                });
            }
        }
    };

    // Deselect selected user
    const resettingSelectedUser = () => {
        setSelectedUser([]);
        setUpdatedUser(Object.create({}));
        setIsCreate(true);
        onDrawerClose();
    };

    // Delete user trigger handler
    const submitDeleteUser = async () => {

        // If there is selected user
        if (updatedUser) {

            // Define which store to use
            const deleteResult = deleteUser(updatedUser);

            // Start firing and await for the response
            deleteResult.then((resp: number) => {

                // If get expected NO CONTENT response from API
                if (resp === 204) {

                    // Promt success status toast notification
                    toast({
                        title: 'User deleted.',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });

                    // Re-fetch all users again to pull latest users
                    GetUsers();

                    // Close alert dialog
                    onAlertDialogClose();

                    // Close user profile component
                    onDrawerClose();

                    // Update reference
                    triggerDelete.current = false;
                }
                else {

                    // Promt error status toast notification if get error status response from API
                    toast({
                        title: 'Oops.',
                        description: "Unable to delete user",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                }
            });

            setProfilePicToShow("");
        }
    };

    // Handler for delete user button click
    const triggerDeleteDialog = useCallback(() => {

        // Setting reference to true value
        triggerDelete.current = true;

        // Prompt alert dialog box to alert user for their attempt action
        onAlertDialogOpen();
    }, [triggerDelete, onAlertDialogOpen]);

    // Handler for profile pic input click
    const triggerProfilePicInput = useCallback(() => {

        // Check if reference not null
        if(profilePicInput !== null && profilePicInput.current !== null) {

            // Trigger hidden input
            profilePicInput.current.click();
        }

    }, [profilePicInput]);

    // Handler for resetting profile picture
    const triggerResetProfilePic = useCallback(() => {
        if (profilePicToShow !== ""){
            setProfilePicToShow("");
            if (updatedUser) {
                updatedUser.profile_pic = "";
            }
        }
    }, [profilePicToShow, updatedUser]);

    // Preparation for action of adding user
    const prepAddUser = () => {
        setProfilePicToShow("");
        setIsCreate(true);
        setSelectedUser(cloneDeep(useUser));
        structUpdateUser();
        onDrawerOpen();
    }

    // Initiate user table
    const inititateTable = useCallback(() => {

        // Generate table header if no generated table head
        if (tableHeader.length === 0) {
            generateTableHeader();
        }

        // Pull users data if there is no users
        if (users.length === 0) {
            GetUsers();
        }
    }, [tableHeader.length, users.length, GetUsers]);

    // Listen to certain changes and run defined function in pre-defined conditions
    useEffect(() => {
        if (!initiate.current) {
            inititateTable();
            initiate.current = true;
        }
    }, [initiate, updatedUser, inititateTable]);

    // Function that generate table header component and return it
    const getTableHeader = (section: string) => {
        return (
            <>
                <Tr key={"user_table_" + section}>
                    {
                        tableHeader.map((column, index) => (
                            <Th key={"user_table_" + section + "_th_" + index} data-index={index} onClick={() => HeaderClick(column.id)}>{column.displayText}</Th>
                        ))
                    }
                </Tr>
            </>
        );
    };

    // Function that generate table tbody component and return it
    const getTableContent = () => {
        return (
            <>
                {
                    users.map((user: Array<IUser>, index: number) => (
                        <Tr key={"user_table_content_tr_" + index} _hover={{
                            fontWeight: "bolder",
                            cursor: "pointer"
                        }}
                            onClick={e => ContentClick(e, user)}
                        >

                            <UserTableContent user={user} index={index} />
                        </Tr>
                    ))
                }
            </>
        )
    };

    // Function that generate user profile component and return it
    const getUserProfileBody = () => {
        return (
            <>
                {
                    selectedUser.map((data_props, _index) => (
                        !data_props.dataType.includes("hidden") && <>
                            {
                                data_props.dataType.includes("picture") && <>
                                    <Center key={"update_user_content_center_" + _index}>
                                        <Box key={"update_user_content_center_box_" + _index}>
                                            <Stack direction='row' spacing='24px' align='center' key={"update_user_content_center_box_stack_" + _index}>
                                                <WrapItem key={"update_user_content_center_box_stack_wrapitem_" + _index}>
                                                    { profilePicToShow !== "" && <>
                                                        <Avatar size='2xl' name={data_props.display_text} src={profilePicToShow}  key={"update_user_content_center_box_stack_wrapitem_profile_pic_" + _index}/>{' '}
                                                    </>}
                                                    { profilePicToShow === "" && <>
                                                        <Avatar size='2xl' icon={<AiOutlineUser />}  key={"update_user_content_center_box_stack_wrapitem_default_icon_" + _index}/>{' '}
                                                    </>}
                                                </WrapItem>
                                                <Stack direction='row' spacing={4} align='center' key={"update_user_content_center_box_stack_stack" + _index}>
                                                    <Button colorScheme='blue' onClick={() => triggerProfilePicInput()} key={"update_user_content_center_box_stack_stack_upload_button_" + _index}>Upload</Button>
                                                    <Button onClick={() => triggerResetProfilePic()} key={"update_user_content_center_box_stack_stack_reset_button_" + _index}>Reset</Button>
                                                </Stack>
                                                <input type='file'
                                                    onChange={(e) => UpdateUser(e, data_props.json_key)}
                                                    accept="image/*"
                                                    name="profile_pic"
                                                    ref={profilePicInput}
                                                    style={{display: 'none'}} 
                                                    key={"update_user_content_center_box_stack_input_" + _index}
                                                />
                                            </Stack>
                                        </Box>
                                    </Center>
                                </>
                            }
                            {
                                !data_props.dataType.includes("picture") && <>
                                    <Box key={"update_user_content_box_" + _index}>
                                        <FormControl isRequired={!data_props.nullable}>
                                            <FormLabel htmlFor={data_props.id} key={"update_user_content_box_" + _index + "_form_label"}>{data_props.display_text}</FormLabel>
                                            <Input
                                                placeholder={data_props.display_text}
                                                id={data_props.id}
                                                readOnly={data_props.readonly}
                                                defaultValue={!isCreate && data_props.value ? data_props.value : ""}
                                                onChange={e => UpdateUser(e, data_props.json_key)}
                                                key={"update_user_content_box_" + _index + "_input"}
                                            />
                                        </FormControl>
                                    </Box>
                                </>
                            }
                        </>
                    ))
                }
            </>
        )
    };

    // Main component HTML for UserTable
    return (
        <>
            <Card flex="1" variant="outline">
                <CardHeader>
                    <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={() => prepAddUser()}>
                        Create user
                    </Button>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <TableCaption>Users Table</TableCaption>
                            <Thead>
                                {getTableHeader("header")}
                            </Thead>
                            <Tbody>
                                {users && users.length > 0 && getTableContent()}
                            </Tbody>
                            <Tfoot>
                                {getTableHeader("footer")}
                            </Tfoot>
                        </Table>
                    </TableContainer>
                    <Drawer
                        isOpen={isDrawerOpen}
                        placement='right'
                        onClose={onDrawerClose}
                        size='xl'
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            {!isCreate && <DrawerHeader borderBottomWidth='1px'>Edit User</DrawerHeader>}
                            {isCreate && <DrawerHeader borderBottomWidth='1px'>Create New User</DrawerHeader>}

                            <DrawerBody>
                                <Stack spacing='24px'>
                                    {getUserProfileBody()}
                                </Stack>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onDrawerClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue' onClick={submitUpdateUser}>
                                    Save
                                </Button>
                                {
                                    !isCreate && <Button colorScheme='red' ml={3} onClick={triggerDeleteDialog}>
                                        Delete
                                    </Button>
                                }
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    <AlertDialog
                        isOpen={isAlertDialogOpen}
                        leastDestructiveRef={cancelAlertDialogRef}
                        onClose={onAlertDialogClose}
                        isCentered
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Delete User {updatedUser?.name}
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure? You can't undo this action afterwards.
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelAlertDialogRef} onClick={onAlertDialogClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={submitDeleteUser} ml={3}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </CardBody>
            </Card>
        </>
    );
};

// exporting UserTable
export { UserTable };