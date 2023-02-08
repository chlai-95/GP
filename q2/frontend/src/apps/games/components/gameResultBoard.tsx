import {
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    Box, 
    VStack, 
    Stack, 
    Card, 
    CardBody,
    Stat, 
    StatLabel, 
    StatNumber, 
    Container,
    Code,
    Center,
    Icon
 } from '@chakra-ui/react'
import { IGameResult } from '../interfaces/interfaces';
import { GiSpades, GiHearts, GiClubs, GiDiamonds} from "react-icons/gi";

function GameResultBoard(props: { gameResults: Array<IGameResult>, gameResultsInArray: Array<Array<Array<string>>> }) {

    // Map which icon to use for each suit
    const getSuitIcons = (suit: string) => {
        switch(suit) {
            case "S":
                return (<><Icon as={GiSpades}/></>)
            case "H":
                return (<><Icon as={GiHearts}/></>)
            case "C":
                return (<><Icon as={GiClubs}/></>)
            case "D":
                return (<><Icon as={GiDiamonds}/></>)
        }
    }

    // Function to populate results blocks in HTML component
    const renderResultsInBlocks = () => {
        return (
            <>
                <Container key={"tab_panel_result_container"} minW="70vw" centerContent>
                    <VStack
                        spacing={6}
                        align='stretch'
                        minW="100%"
                        key={"tab_panel_result_container_vstack"}
                    >
                        {
                            props.gameResults.map((result, r_index) => (
                                <>
                                    <Box key={"tab_panel_result_container_vstack_box_"+r_index}>
                                        <Stack direction={['column', 'row']} spacing='24px' key={"tab_panel_result_container_vstack_box_"+r_index+"_stack"}>
                                            <Box w='40%' key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_player"}>
                                                <Card flex="1" h='100%' variant="filled" key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_player_card"}>
                                                    <CardBody key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_player_card_cardbody"}>
                                                        <Stat key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_player_card_cardbody_stat"}>
                                                            <StatLabel key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_player_card_cardbody_stat_statlabel"}>Player</StatLabel>
                                                            <StatNumber key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_player_card_cardbody_stat_statnumber"}>{result.player + 1}</StatNumber>
                                                        </Stat>
                                                    </CardBody>
                                                </Card>
                                            </Box>
                                            <Box w='60%' key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_result"}>
                                                <Card flex="1" h='100%' variant="filled" key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_result_card"}>
                                                    <CardBody key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_result_card_cardbody"}>
                                                        <Stat key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_result_card_cardbody_stat"}>
                                                            <StatLabel key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_result_card_cardbody_stat_statlabel"}>Result</StatLabel>
                                                            <StatNumber key={"tab_panel_result_container_vstack_box_"+r_index+"_stack_box_result_card_cardbody_stat_statnumber"}>
                                                                {
                                                                    result.cards.map((card, c_index) => (
                                                                        <>
                                                                            {
                                                                                c_index > 0 && 
                                                                                <>, </>
                                                                            }

                                                                            {getSuitIcons(card.suit)} {card.suit}{card.number}
                                                                        </>
                                                                    ))
                                                                }
                                                            </StatNumber>
                                                            {/* <StatHelpText>
                                                                <StatArrow type='increase' />
                                                                23.36%
                                                            </StatHelpText> */}
                                                        </Stat>
                                                    </CardBody>
                                                </Card>  
                                            </Box>
                                        </Stack>
                                    </Box>
                                </>
                            ))

                        }
                    </VStack>
                </Container>
            </>
        )
    }

    // Function to populate read-able array results blocks in HTML component
    const renderResultsInArray = () => {
        return (
            <>
                <Container key={"tab_panel_result_in_array_container"} minW="70vw" centerContent>
                    <VStack
                        spacing={6}
                        align='stretch'
                        minW="100%"
                        key={"tab_panel_result_in_array_container_vstack"}
                    >       
                    {
                        props.gameResultsInArray.map((r_array, r_index) => (
                            <>
                                <Box key={"tab_panel_result_in_array_container_vstack_box_"+r_index} alignContent="center">
                                    <Center>
                                        <Code key={"tab_panel_result_in_array_container_vstack_box_"+r_index+"_code_"+r_index}>
                                            {JSON.stringify(r_array)}
                                        </Code>
                                    </Center>
                                </Box> 
                            </>
                        ))
                    }
                    </VStack>
                </Container>
            </>
        )
    }

    // Main component HTML for GameResultBoard
    return (
        <>
            <Box>
                <Tabs variant='soft-rounded' colorScheme='green' isFitted>
                    <TabList>
                        <Tab>Results</Tab>
                        <Tab>Results in Array</Tab>
                    </TabList>
                    <TabPanels mt="5">
                        <TabPanel>
                            {renderResultsInBlocks()}
                        </TabPanel>
                        <TabPanel>
                            {renderResultsInArray()}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
}

// exporting GameResultBoard
export { GameResultBoard }