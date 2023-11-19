import React, { useEffect, useState } from 'react';
import { Grid } from "./components/grid";
import "./App.css"
import { BingoSquare } from "./components/bingo-square";
import { BoardState, newBingo, update } from "./helper-functios";
import cloneDeep from "lodash/cloneDeep"
import { BingoAlert } from "./components/bingo-alert";
import { ButtonGroup } from "./components/button-group";
import { Button } from "react-bootstrap";
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getHashFromBingoElements, getStateFromHash, storeStateWithHash } from './storage';
import { BingoNavBar } from './components/navbar';

function BingoPage() {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [bingoElements, setBingoElements] = useState<string[]>([]);
    const [backgroundColor, setBackgroundColor] = useState<string>("");
    const [tileColor, setTileColor] = useState<string>("");
    const [textColor, setTextColor] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const [boardState, setBoardState] = useState<BoardState | undefined>(undefined)
    const [showBingoOverlay, setShowBingoOverlay] = useState(false)

    const activateSquare = (index: number) => () => {
        setBoardState(prevState => {
            if (prevState) {
                const newSquareState = cloneDeep(prevState)
                newSquareState.squares[index].active = !newSquareState.squares[index].active
                const { newState, bingo } = update(newSquareState)
                if (bingo) setShowBingoOverlay(bingo)
                return newState
            }
            return prevState
        })
    }

    useEffect(() => {
        const options = searchParams.getAll("option")
        setBingoElements(options);
        const backgroundColorSearchParam = searchParams.get("backgroundColor")
        if (backgroundColorSearchParam)
            setBackgroundColor(backgroundColorSearchParam)
        const textColorSearchParam = searchParams.get("textColor")
        if (textColorSearchParam)
            setTextColor(textColorSearchParam)
        const tileColorSearchParam = searchParams.get("tileColor")
        if (tileColorSearchParam)
            setTileColor(tileColorSearchParam)
        const titleSearchParam = searchParams.get("title")
        if (titleSearchParam)
            setTitle(titleSearchParam)

    }, [searchParams])

    useEffect(() => {
        if (bingoElements.length > 0) {
            const hash = getHashFromBingoElements(bingoElements);
            const storedState = getStateFromHash(hash);
            if (storedState !== undefined) {
                setBoardState(storedState)
            } else {
                setBoardState(newBingo(bingoElements))
            }
        }
    }, [bingoElements])

    useEffect(() => {
        if (boardState && bingoElements) {
            const hash = getHashFromBingoElements(bingoElements);
            storeStateWithHash(boardState, hash);
        }
    }, [boardState, bingoElements])

    return (
        <div className="app" style={{ backgroundColor: backgroundColor }}>
            <BingoNavBar title={title} onNewTiles={!!bingoElements.length ? () => {
                        setBoardState(newBingo(bingoElements))} : undefined}/>
            {bingoElements && (
                <>
                    {boardState?.squares.length ? (
                        <Grid>
                            {boardState?.squares.map((value, index) =>
                                <BingoSquare active={value.active} text={value.text} key={index}
                                    onClick={activateSquare(index)} textColor={textColor} baseBackgroundColor={tileColor} />)}
                        </Grid>
                    ) : (<div className='onboarding-message-wrapper'><div>No board yet :( <br /> Start by either clicking the button above to create a new bingo tile set or by pasting in a tile set created by someone else in the url</div></div>)}

                    {showBingoOverlay && <BingoAlert open={showBingoOverlay} onClick={() => setShowBingoOverlay(false)} />}
                </>)}



        </div>
    );
}

export default BingoPage;
