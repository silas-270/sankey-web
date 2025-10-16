import ReactDOM from 'react-dom'
import styles from './ImageGallery.module.css'

const ImageGallery = ({
    onClose,
    image
}) => {
    const handleOverlayClick = (e) => {
        if (onClose && (e.target === e.currentTarget)) onClose()
    }

    return ReactDOM.createPortal(
        <div className={styles.Overlay} onClick={handleOverlayClick}>
            <div className={styles.imageWrapper}>
                <img src={image.src} />
            </div>
        </div>,
        document.body
    )
}

export default ImageGallery