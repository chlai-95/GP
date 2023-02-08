import { cloneDeep } from "lodash";
import { ICard } from "../interfaces/card";
import { ICardMap, ISuitMap } from "./card";

// Function to generate a full deck of card, which return "SA" to "DK"
const IDeck = () => {
    let newCardMap = cloneDeep(ICardMap);
    let newSuitMap = cloneDeep(ISuitMap);

    let newDeck: Array<ICard> = [];
    newSuitMap.map((suit, s_index) => {
        newCardMap.map((card, c_index) => {
            let newCard: ICard = {suit: suit, number: card};
            newDeck.push(newCard);
            return newDeck;
        });
        return newDeck;
    });

    return newDeck;
}

export { IDeck };