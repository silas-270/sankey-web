import { useState } from 'react'
import ImageGallery from '@molecules/ImageGallery'
import { formatDateFromISO } from '@services/data/formatEntries'
import PutUpdateModal from '@molecules/Modals/PutUpdateModal'
import Edit from '@assets/Edit.svg'
import styles from './UpdateNode.module.css'

const UpdateNode = ({ update, link }) => {
    const [showModal, setShowModal] = useState(false)
    const [showImageGallery, setShowImageGallery] = useState(false)
    const [expanded, setExpanded] = useState(false)

    // Format date for display
    const formattedDate = formatDateFromISO(update.created_at)

    const handleOnClick = () => {
        setExpanded((prev) => !prev)
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
                                            <button key={index} className={styles.imageButton}
                                                onClick={() => setShowImageGallery(true)}>
                                                <img src={image.src} />
                                            </button>
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
            {showImageGallery && (
                <ImageGallery
                    onClose={() => setShowImageGallery(false)}
                    image={update.meta.images[0]}
                />
            )}
        </>
    )
}

export default UpdateNode