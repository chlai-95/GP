import { cloneDeep } from "lodash"
import { ICard, IGameResult } from "../interfaces/interfaces";
import { IDeck } from "../mappers/mappers";

class Game {

    // Define necessary variables
    private _total_players: number;
    private _cards_per_player: number = 1;
    private _generatedCards: Array<ICard> = [];
    private _generatedGameResult: Array<IGameResult> = [];
    private _newDeck: Array<ICard> = cloneDeep(IDeck());
    private _gameStatus: string = "initiating";

    // Constructor
    constructor(props: {players: number, cards_per_player?: number}) {
        this._total_players = props.players <= 52 ? props.players : 52;
        this._cards_per_player = props.cards_per_player && (props.cards_per_player > 0 && props.cards_per_player <= 5) ? props.cards_per_player : 1;
    }

    // Function to start a new initiate game
    public start() {
        for (let player_i=0;player_i<=this._total_players-1;) {
            let cardForPlayers: Array<ICard> = [];
            for(let card_i=0;card_i<=this._cards_per_player-1;) {
                let newCards = this._generateCard();
                cardForPlayers.push(newCards);
                card_i++;
            };
            let generatedResult: IGameResult = {
                player: player_i,
                cards: cardForPlayers
            };
            this._generatedGameResult.push(generatedResult);
            player_i++;
        }
        this._gameStatus = "generated";
    }

    // Function to get current game status
    public status() {
        return this._gameStatus;
    }

    // Function to get game result
    public result(): Array<IGameResult> {
        return this._generatedGameResult;
    }

    // Function to get game result in array
    public resultInArray(): Array<Array<Array<string>>> {
        let resultsArray: Array<Array<Array<string>>> = [];
        this._generatedGameResult.map((result, r_index) => {
            let _resultsArray: Array<Array<string>> = [];
            result.cards.map((card, c_index) => {
                let resultArray: Array<string> = [card.suit, card.number];
                _resultsArray.push(resultArray)
                return _resultsArray;
            })
            resultsArray.push(_resultsArray);
            return resultsArray;
        });
        return resultsArray;
    }

    // Function to generate card for particular player
    private _generateCard() {
        let pickedCard: number = this._randomPickCard();
        let newGenerateCard: ICard = {
            suit: this._newDeck[pickedCard].suit,
            number: this._newDeck[pickedCard].number
        };
        this._generatedCards.push(newGenerateCard);
        return newGenerateCard;
    }

    // Function to randomly pick a card for player
    private _randomPickCard() {
        let newPickedCard: number;
        while(true) {
            const random = Math.floor(Math.random() * 52);
            if(this._newDeck[random-1]) {
                newPickedCard = random-1;
                this._newDeck.slice(random-1, 1);
                break;
            }
            continue;
        }
        return newPickedCard;
    }
}

// exporting Game
export { Game };