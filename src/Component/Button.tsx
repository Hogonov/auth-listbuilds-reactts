import React from 'react';
import style from './ComponentStyles/Button.module.css'

type Props = {
    text: string;
    clickHandler(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const Button:React.FunctionComponent<Props> = ({text, clickHandler}) => {
    return <button className={`btn ${style.button}`} onClick={clickHandler}>{text}</button>
}
