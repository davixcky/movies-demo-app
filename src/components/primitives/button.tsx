import React from "react";

import styles from './button.module.css';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    leftIcon?: React.ReactNode;
}

export const Button = ({children, onClick, leftIcon}: ButtonProps) => {
    return (
        <button onClick={onClick} className={`${styles.variant__transparent} ${styles.variant}`}>
            { leftIcon && <div>{leftIcon}</div> }
            {children}
        </button>
    );
}
