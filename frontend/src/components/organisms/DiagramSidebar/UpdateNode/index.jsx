import { useState } from 'react'
import PutUpdateModal from '@molecules/Modals/PutUpdateModal'
import Edit from '@assets/Edit.svg'
import styles from './UpdateNode.module.css'

const UpdateNode = ({ update, link }) => {
    const [showModal, setShowModal] = useState(false)
    const [expanded, setExpanded] = useState(false)

    // Format date for display
    const date = new Date(update.created_at)
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })

    const handleOnClick = () => {
        setExpanded((prev) => !prev)
    }

    update.meta = {
        images: [
            { src: 'https://images.unsplash.com/photo-1757495152235-e6a79bcf7ea2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=500' },
            { src: 'https://images.unsplash.com/photo-1758801305053-97e7e20fee3e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500' },
            { src: 'https://images.unsplash.com/photo-1758944967067-bf0177898364?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500' }
        ]
    }

    return (
        <>
            <div className={styles.UpdateNodeWrapper}>
                <div className={styles.UpdateNode}>
                    <button className={styles.square} onClick={() => setShowModal(true)}>
                        <img src={Edit} alt='T' />
                    </button>
                    <div className={styles.nameValueWrapper}>
                        <button className={`${styles.listEntry} ${styles.listButton}`} onClick={handleOnClick}>
                            <div className={styles.name}>{update.name}</div>
                            <div className={`${styles.value} ${update.value > 0 ? styles.negativeValue : styles.positiveValue}`}>
                                {`${update.value > 0 ? '+' : ''}${update.value.toFixed(2)}$`}
                            </div>
                        </button>
                        {expanded && (
                            <>
                                {/* Images */}
                                {(update.meta && update.meta.images) && (
                                    <div className={styles.imageContainer}>
                                        {update.meta.images.map((image, index) => (
                                            <img key={index} src={image.src} />
                                        ))}
                                    </div>
                                )}

                                {/* Add Meta here */}
                                <div className={styles.date}>{formattedDate}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {showModal && (
                <PutUpdateModal
                    onClose={() => setShowModal(false)}
                    link={link}
                    update={update}
                />
            )}
        </>
    )
}

export default UpdateNode