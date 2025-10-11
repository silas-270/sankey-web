import styles from './Tooltip.module.css'

const Tooltip = ({ position = 'top', text, children, style }) => {
    return (
        <div className={styles.tooltipWrapper} style={style}>
            {children}
            <div className={`${styles.tooltipBubble} ${styles[position]}`}>
                {text}
            </div>
        </div>
    )
}

export default Tooltip