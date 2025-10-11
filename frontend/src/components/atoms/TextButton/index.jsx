import styles from './TextButton.module.css'

const TextButton = ({
    label,
    onClick,
    type,
    style
}) => {
    const buttonStyles = {
        green: styles.green,
        red: styles.red
    }
    return (
        <button
            className={`${styles.TextButton} ${buttonStyles[type]}`}
            onClick={onClick}
            style={style}
        >
            {label}
        </button>
    )
}

export default TextButton