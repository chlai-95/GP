import {
    useToast,
    FormControl,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Card,
    CardBody,
    Container,
    Grid,
    VStack,
    CardFooter,
    Button,
    FormLabel,
    HStack,
    Spinner,
    Center
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IGameResult } from "../interfaces/card";
import { Game } from "../stores/games";
import { GameResultBoard } from "./gameResultBoard";

function GameDashboard() {
    
    // Define a new reference to refer to a boolean value
    let played = useRef(false);

    // Use Chakra-UI toast component
    const toast = useToast();

    // Setting up necessary states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [players, setPlayers] = useState<number>(0);
    const [cardPerPlayer, setCardPerPlayer] = useState<number>(1);
    const [gameResults, setGameResults] = useState<Array<IGameResult>>([]);
    const [gameResultsInArray, setGameResultsInArray] = useState<Array<Array<Array<string>>>>([]);

    useEffect(() => {
    }, [played]);

    // Handler for players input onchange
    const UpdatePlayers = (no: number) => {
        if (no && no !== players && no > 0) {
            setPlayers(no);
        }
    }

    // Handler for card per player input onchange
    const UpdateCardPerPlayer = (no: number) => {
        if (no && no !== cardPerPlayer && no > 0 && no < 6) {
            setCardPerPlayer(no);
        }
    }

    // Handler for reset game button click
    const ResetGame = () => {
        if (players > 0){
            setPlayers(0);
        }

        if (cardPerPlayer > 0){
            setCardPerPlayer(0);
        }

        if (gameResults.length > 0){
            setGameResults([]);
        }
    }

    // Handler for start game button click
    const StartNewGame = async () => {
        
        // Check if it meets the rules to start a game
        if (players > 0 && (cardPerPlayer > 0 && cardPerPlayer < 6)) {

            // Calculate how many cards will be populated
            let setOfCards = cardPerPlayer * players;

            // If the total of cards populated is within limit range of 52
            if (setOfCards > 0 && setOfCards < 53) {

                // Setting loading mode
                setIsLoading(true);

                let totalPlayers = players;

                // Initiate a new Game with defined settings
                let newGame = new Game({ players: totalPlayers, cards_per_player: cardPerPlayer });

                // Start the Game
                newGame.start();

                // Get the status of Game
                let currentStatus = newGame.status();
                
                // Waiting the status become generated
                while (currentStatus !== "generated") {

                    // Refresh the Game status
                    currentStatus = newGame.status();
                    
                    // Break the waiting once status become generated
                    if (newGame.status() === "generated") {
                        break;
                    }
                    
                    // wait for 1 sec between each refresh
                    await sleep(1000);
                    continue;
                }

                // Populating results with game results
                generateResults(newGame.result());
                generateResultsInArray(newGame.resultInArray());

                // Setting into played mode
                played.current = true;

                // Setting out from loading mode
                setIsLoading(false);

                // Promt success status toast notification
                toast({
                    title: 'Taa-daa!',
                    description: "Games generated successfully",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }
            else {

                // Promt warning status toast notification with provided message
                toast({
                    title: 'Oops',
                    description: "There is not enough cards for each player. Total card is 52.",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
        else {

            // Define what message should be prompt
            let displayMessage = "";
            if (players < 0 || players === 0) {
                displayMessage = "Please key-in a number of player(s) in between [0 to 52]";
            } else if (cardPerPlayer === 0 || cardPerPlayer < 0 || cardPerPlayer > 5) {
                displayMessage = "Please provide card(s) per player in between [1 to 5]";
            }

            // Promt warning status toast notification with provided message
            toast({
                title: 'Oops',
                description: displayMessage,
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
        }
    }

    // Populating game result
    const generateResults = (newResults: Array<IGameResult>) => {
        if (newResults && newResults.length > 0) {
            setGameResults(newResults);
        }
    }

    // Populating game result in read-able array format
    const generateResultsInArray = (newResultsArray: Array<Array<Array<string>>>) => {
        if (newResultsArray && newResultsArray.length > 0) {
            console.log(newResultsArray);
            setGameResultsInArray(newResultsArray);
        }
    }

    // Custom function to wait for certain period of time
    const sleep = (delay: number) => {
        return new Promise( res => setTimeout(res, delay) );
    }

    // Main component HTML for GameDashboard
    return (
        <>
            <Grid minH="15vh" p={3}>
                <Container maxW="90%" left={"10%"}>
                    <VStack
                        spacing={4}
                        align='stretch'
                    >
                        <Card flex="1" variant="outline">
                            <CardBody>
                                <HStack spacing='1%'>
                                    <FormControl w="60%">
                                        <FormLabel>Total of Players</FormLabel>
                                        <NumberInput 
                                            id="player"
                                            value={players}
                                            min={1}
                                            max={52}
                                            onChange={(valueString) => UpdatePlayers(Number(valueString))}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl w="40%">
                                        <FormLabel>Cards Per Player</FormLabel>
                                        <NumberInput 
                                            id="cards_per_player"
                                            value={cardPerPlayer}
                                            min={1}
                                            max={5}
                                            onChange={(valueString) => UpdateCardPerPlayer(Number(valueString))}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                </HStack>
                            </CardBody>
                            <CardFooter
                                justify='space-between'
                                flexWrap='wrap'
                            >
                                <Button flex='1' variant='outline' mr={3} onClick={ResetGame}>
                                    Reset Game
                                </Button>
                                <Button flex='1' colorScheme='blue' onClick={StartNewGame}>
                                    Start Game
                                </Button>
                            </CardFooter>
                        </Card>
                        { 
                            played.current && gameResults.length > 0 &&
                            <Card flex="1" mt="2%" variant="outline">
                                <CardBody>
                                {
                                    isLoading && <Center>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                        />
                                    </Center>
                                }
                                    <GameResultBoard gameResults={gameResults} gameResultsInArray={gameResultsInArray}  key={"gameresultboard"}/>
                                </CardBody>
                            </Card>
                        }
                    </VStack>
                </Container>
            </Grid>

        </>
    )
}

// exporting GameDashboard
export { GameDashboard }