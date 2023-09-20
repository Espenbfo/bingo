import React, {useEffect, useState} from 'react';
import {Grid} from "./components/grid";
import "./App.css"
import {BingoSquare} from "./components/bingo-square";
import {BoardState, loadSongs, newBingo, SongData, update} from "./helper-functios";
import cloneDeep from "lodash/cloneDeep"
import {BingoAlert} from "./components/bingo-alert";
import {ButtonGroup} from "./components/button-group";
import {Button} from "react-bootstrap";
import {SongTable} from "./components/song-table";


function BingoPage() {
    const [boardState, setBoardState] = useState<BoardState | undefined>(undefined)
    const [showBingoOverlay, setShowBingoOverlay] = useState(false)
    const [showBingoGrid, setShowBingoGrid] = useState(true)
    const [songs, setSongs] = useState<SongData[] | undefined>(undefined)

    const activateSquare = (index: number) => () => {
        setBoardState(prevState => {
            if (prevState) {
                const newSquareState = cloneDeep(prevState)
                newSquareState.squares[index].active = !newSquareState.squares[index].active
                const {newState, bingo} = update(newSquareState)
                if (bingo) setShowBingoOverlay(bingo)
                return newState
            }
            return prevState
        })
    }

    const updateScore = (index: number) => (mode: string) =>  (event: React.ChangeEvent<HTMLInputElement>) => {
        setSongs(prevState => {
            if (prevState)  {
                const newState = cloneDeep(prevState)
                if (!isNaN(Number.parseFloat(event.target.value))) {
                    switch (mode) {
                        case "song":
                            newState[index].songScore = Number.parseFloat(event.target.value);
                            break;
                        case "scene":
                            newState[index].sceneScore = Number.parseFloat(event.target.value);
                            break;
                        case "original":
                            newState[index].originalScore = Number.parseFloat(event.target.value);
                            break;
                    }
                }
                return newState;
            }

            return prevState;
        })
    }
    useEffect(() => {
        const storage = localStorage.getItem("state")
        console.log(loadSongs())
        if (storage != null) {
            setBoardState(JSON.parse(storage))
        } else {
            setBoardState(newBingo())
        }
        const songStorage = localStorage.getItem("songs")
        if (songStorage != null) {
            setSongs(JSON.parse(songStorage))
        } else {
            setSongs(loadSongs())
        }
    }, [])

    useEffect(() => {
        if (boardState) {
            localStorage.setItem("state", JSON.stringify(boardState))
        }
    }, [boardState])

    useEffect(() => {
        if (songs) {
            localStorage.setItem("songs", JSON.stringify(songs))
        }
    }, [songs])

    return (
        <div className="app">
            <header className="header">
                Eurovision Bingo & Score card
            </header>

            <ButtonGroup>
                <Button className={"button"} variant="primary"
                        onClick={() => setShowBingoGrid(!showBingoGrid)}>{showBingoGrid ? "View Scores" : "View Bingo"}</Button>
                <Button variant="warning" onClick={() => {
                    setBoardState(newBingo());
                    setSongs(loadSongs());
                    setShowBingoGrid(true);
                }}>Reset</Button>
            </ButtonGroup>

            {showBingoGrid ? (<Grid>
                    {boardState?.squares.map((value, index) =>
                        <BingoSquare active={value.active} text={value.text} key={value.text}
                                     onClick={activateSquare(index)}/>)}
                </Grid>) :
                (<SongTable songs={songs} updateScore={updateScore}/>)}

            {showBingoOverlay && <BingoAlert open={showBingoOverlay} onClick={() => setShowBingoOverlay(false)}/>}

        </div>
    );
}

export default BingoPage;
