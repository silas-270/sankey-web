import styles from './Tooltip.module.css'

const Tooltip = ({ position = 'top', text, children, style, tooltipWidth }) => {
    return (
        <div className={styles.tooltipWrapper} style={style}>
            {children}
            <div className={`${styles.tooltipBubble} ${styles[position]}`}
                style={{ width: tooltipWidth }}>
                {text}
            </div>
        </div>
    )
}

export default Tooltip