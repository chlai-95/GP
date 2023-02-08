// Define card model
export interface ICard {
    suit: string,
    number: string
}

// Define game result model
export interface IGameResult {
    player: number,
    cards: Array<ICard>
}

// Define game model
export interface IGame {
    total_player: number,
    result: Array<IGameResult>
}