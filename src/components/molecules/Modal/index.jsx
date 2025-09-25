import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const Modal = ({
    children,
    onClose
}) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    return ReactDOM.createPortal(
        <div className={styles.popupOverlay} onClick={handleOverlayClick}>
            <div className={styles.popup}>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default Modal