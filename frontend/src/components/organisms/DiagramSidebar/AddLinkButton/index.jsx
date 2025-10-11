import styles from './TextButton.module.css'

const TextButton = ({ label, onClick }) => {
    return (
        <button className={styles.TextButton} onClick={onClick}>
            {label}
        </button>
    )
}

export default TextButton