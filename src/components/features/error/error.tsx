import styles from './error.module.css';

type ErrorProps = {
    message?: string;
}

export const Error = ({message = 'Error 404'}: ErrorProps) => {
    return (
        <div className={styles.main}>
            <div className={styles.fof}>
                <h1>{message}</h1>
            </div>
        </div>
    )
}