import ReactDOM from 'react-dom'
import styles from './Template.module.css'

const Template = ({
    onClose,
    style,
    children
}) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    return ReactDOM.createPortal(
        <div className={styles.popupOverlay} onClick={handleOverlayClick}>
            <div className={styles.popup} style={style}>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default Template