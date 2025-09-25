import styles from './TextButton.module.css'

const TextButton = ({
    label,
    onClick,
    type
}) => {
    const buttonStyles = {
        green: styles.green,
        red: styles.red
    }
    return (
        <button
            className={`${styles.TextButton} ${buttonStyles[type]}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default TextButton