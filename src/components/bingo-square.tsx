import clsx from "clsx";
import "./bingo-square.css"
import { BingoElement } from "../helper-functios";

type Props = BingoElement & { onClick: () => void }

export const BingoSquare = ({ active, text, onClick }: Props) => {
    return (<div className={clsx("square")} onClick={onClick}>
        <div className={clsx("square-inside", active && "active")} key={text}><span>{text}</span></div>
    </div>);
}