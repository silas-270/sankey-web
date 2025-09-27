import { useState } from 'react'
import { validateLinkEntries } from '@services/hooks/validateSankeyData'
import Modal from '@molecules/Modal'
import NewLinkModal from '@molecules/ModalTemplates/NewLinkModal'
import styles from './NewSourceBtn.module.css'

const NewSourceBtn = ({ addLink }) => {
    const [showModal, setShowModal] = useState(false)
    const [sourceId, setSourceId] = useState('')
    const [sourceVolume, setSourceVolume] = useState('')

    const handleOnClose = () => {
        setSourceId('')
        setSourceVolume('')
    }

    const handleAddTargetLink = () => {
        const error = validateLinkEntries(sourceId, "Placeholder", sourceVolume)
        if (!error) {
            console.log(`Create source with name: ${sourceId} and ${sourceVolume}$`)
        }
    }

    return (
        <>
            <button className={styles.NewSourceBtn} onClick={() => setShowModal(true)}>
                New Source
            </button>
        </>
    )
}

export default NewSourceBtn