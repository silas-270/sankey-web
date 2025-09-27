import styles from './TextInput.module.css'

const TextInput = ({
    value,
    onChange,
    placeholder = '',
    style
}) => {
    return (
        <input
            style={style}
            className={styles.TextInput}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    )
}

export default TextInput