import React, { useEffect, useState } from 'react';
import { Grid } from "./components/grid";
import "./App.css"
import { BingoSquare } from "./components/bingo-square";
import { BoardState, loadSongs, newBingo, update } from "./helper-functios";
import cloneDeep from "lodash/cloneDeep"
import { BingoAlert } from "./components/bingo-alert";
import { ButtonGroup } from "./components/button-group";
import { Button } from "react-bootstrap";
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';


function BingoPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [bingoElements, setBingoElements] = useState<string[]>([]);
    const [backgroundColor, setBackgroundColor] = useState<string>("");
    const [textColor, setTextColor] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const [boardState, setBoardState] = useState<BoardState | undefined>(undefined)
    const [showBingoOverlay, setShowBingoOverlay] = useState(false)

    const returnToForm = () => {
        navigate({ pathname: "/", search: `?${createSearchParams(searchParams)}` })
    }

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
        if (bingoElements.length) {
            const storage = localStorage.getItem("state")
            console.log(loadSongs())
            if (storage != null) {
                setBoardState(JSON.parse(storage))
            } else {
                setBoardState(newBingo(bingoElements))
            }
        }
    }, [bingoElements])

    useEffect(() => {
        if (boardState) {
            localStorage.setItem("state", JSON.stringify(boardState))
        }
    }, [boardState])

    useEffect(() => {
        const options = searchParams.getAll("option")
        setBingoElements(options);
        const backgroundColorSearchParam = searchParams.get("backgroundColor")
        if (backgroundColorSearchParam)
            setBackgroundColor(backgroundColorSearchParam)
        const textColorSearchParam = searchParams.get("textColor")
        if (textColorSearchParam)
            setBackgroundColor(textColorSearchParam)
        const titleSearchParam = searchParams.get("title")
        if (titleSearchParam)
            setTitle(titleSearchParam)

    }, [searchParams])
    return (
        <div className="app">
            <header className="header">
                {title}
            </header>
            {bingoElements && (
                <>

                    <ButtonGroup>
                        <Button className={"button"} variant="primary"
                            onClick={() => returnToForm()}>{"Edit bingo values"}</Button>
                        <Button variant="warning" onClick={() => {
                            setBoardState(newBingo(bingoElements));
                        }}>New board</Button>
                    </ButtonGroup>
                    <Grid>
                        {boardState?.squares.map((value, index) =>
                            <BingoSquare active={value.active} text={value.text} key={index}
                                onClick={activateSquare(index)} />)}
                    </Grid>
                    {showBingoOverlay && <BingoAlert open={showBingoOverlay} onClick={() => setShowBingoOverlay(false)} />}
                </>)}



        </div>
    );
}

export default BingoPage;