import { sha256 } from "js-sha256"
import { BoardState } from "./helper-functios"

type StoredStatesDict = { [hash: string]: BoardState }

export const getHashFromBingoElements = (bingoElements: string[]): string =>
    sha256(bingoElements.sort().reduce((prev, current) => prev + current))

export const getStateFromHash = (hash: string) => {
    const storage = localStorage.getItem("state")
    if (storage != null) {
        const parsed: StoredStatesDict = JSON.parse(storage)
        if (parsed.squares) {
            localStorage.removeItem("state")
            return
        }
        if (parsed[hash]) {
            return parsed[hash]
        }
    }
    return undefined
}

export const storeStateWithHash = (state: BoardState, hash: string) => {
    const storage = localStorage.getItem("state")
    if (storage != null) {
        const parsed: StoredStatesDict = JSON.parse(storage)
        parsed[hash] = state
        localStorage.setItem("state", JSON.stringify(parsed))
        return
    }
    else {
        const State: StoredStatesDict = { hash: state }
        localStorage.setItem("state", JSON.stringify(State))
        return
    }
    throw new Error("Something went wrong with storing the board state")
}