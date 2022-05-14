import bingoElements from "./data/bingo.json"

function shuffleArray(arr: any[]) {
    arr.sort(() => Math.random() - 0.5);
}

function range(start: number, end: number) {
    var ans: number[] = [];
    for (let i = start; i < end; i++) {
        ans.push(i);
    }
    return ans;
}

function zeros(length: number) {
    return range(0, length).map(() => 0)
}

export type BingoElement = { active: boolean, text?: string }
export type BingoArray = boolean[]
export type BoardState = { squares: BingoElement[], bingoRows: BingoArray, bingoCols: BingoArray, bingoDiagonals: BingoArray }

const boardSize = 4

export const newBingo = (): BoardState => {
    shuffleArray(bingoElements)
    return {
        squares: bingoElements.slice(0, boardSize * boardSize).map((element: string) => ({
                active: false,
                text: element
            }),
        ),
        bingoRows: range(0, boardSize).map(() => false),
        bingoCols: range(0, boardSize).map(() => false),
        bingoDiagonals: range(0, 2).map(() => false),
    }
}


const isBingo = (newArr: boolean[], oldArr: boolean[]) => {
    return oldArr.some((value, index) => newArr[index] && !value)
}


export const update = (state: BoardState): { newState: BoardState; bingo: boolean } => {
    const rows = evaluateRows(state.squares);
    const cols = evaluateCols(state.squares);
    const diags = evaluateDiag(state.squares);
    const bingo = isBingo(rows, state.bingoRows) || isBingo(cols, state.bingoCols) || isBingo(diags, state.bingoDiagonals)

    return {newState: {squares: state.squares, bingoDiagonals: diags, bingoCols: cols, bingoRows: rows}, bingo}
}

const evaluateRows = (elements: BingoElement[]) => {
    return elements.reduce((previousValue, currentValue, currentIndex) => {
        if (currentValue.active) previousValue[Math.floor(currentIndex / boardSize)] += 1;
        return previousValue
    }, zeros(boardSize).map(() => 0)).map(value => value / boardSize === 1)
}
const evaluateCols = (elements: BingoElement[]) => {
    return elements.reduce((previousValue, currentValue, currentIndex) => {
        if (currentValue.active) previousValue[currentIndex % boardSize] += 1;
        return previousValue
    }, zeros(boardSize)).map(value => value / boardSize === 1)
}
const evaluateDiag = (elements: BingoElement[]) => {
    return [range(0, boardSize).every(value => elements[value * boardSize + value].active),
        range(0, boardSize).every(value => elements[boardSize - value-1 + value * boardSize].active)]
}