import clsx from "clsx";
import "./bingo-square.css"
import { BingoElement } from "../helper-functios";

type Props = BingoElement & { onClick: () => void, textColor: string, baseBackgroundColor: string }

export const BingoSquare = ({ active, text, onClick, textColor, baseBackgroundColor }: Props) => {
    return (<div className={clsx("square")} onClick={onClick}>
        <div className={clsx("square-background", active && "active")} style={{ backgroundColor: baseBackgroundColor }} />
        <div className={clsx("circle", active && "active")} style={{ backgroundColor: baseBackgroundColor }} />
        <div style={{ color: textColor }} className={clsx("square-inside")} key={text}><span>{text}</span></div>
    </div>);
}