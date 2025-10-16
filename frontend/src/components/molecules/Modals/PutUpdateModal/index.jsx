import { useState } from 'react'
import validateUpdate from '@services/data/validateUpdate'
import { formatDateToISO, formatDateFromISO } from '@services/data/formatEntries'
import useSankey from '@services/hooks/useSankey'
import Template from '../Template'
import FileUpload from '@atoms/FileUpload'
import TextInput from '@atoms/TextInput'
import TextButton from '@atoms/TextButton'
import styles from './PutUpdateModal.module.css'
import { formatValue } from '@services/data/formatEntries'

const PutUpdateModal = ({ onClose, link, update }) => {
    const { putUpdate, delUpdate } = useSankey()

    const [description, setDescription] = useState(update.name || '')
    const [value, setValue] = useState(update.value || '')
    const [date, setDate] = useState(formatDateFromISO(update.created_at) || '')
    const [meta, setMeta] = useState(update.meta || { images: [] })
    const [newFilesArray, setNewFilesArray] = useState([])
    const [showDanger, setShowDanger] = useState(false)

    // Image Arrays
    const handleOnClose = () => {
        setDate('')
        setDescription('')
        setValue('')
        setMeta({})
        setNewFilesArray([])
        onClose()
    }

    const handleOnSuccess = () => {
        const formattedDate = formatDateToISO(date)
        const formattedValue = formatValue(value)
        if (!formattedDate) {
            console.warn('Date must be in DD.MM.YYYY format')
            return
        }
        const inputs = {
            name: description.trim(),
            value: formattedValue,
            created_at: date.trim()
        }
        const { success, message } = validateUpdate(inputs, true)
        if (!success) {
            console.warn(message)
            return
        }

        // Collect data
        const formData = new FormData()

        // Append text fields
        formData.append('update_id', update.id)
        if (description.trim() !== update.name) {
            formData.append('name', description.trim())
        }
        if (formattedValue !== update.value) {
            formData.append('value', formattedValue)
        }
        if (formattedDate !== update.created_at) {
            formData.append('created_at', formattedDate)
        }
        if (meta !== update.meta) {
            formData.append('prev_meta', JSON.stringify(update.meta))
            formData.append('new_meta', JSON.stringify(meta))
        }

        // Append files using the key 'images'
        newFilesArray.forEach((file) => {
            formData.append('images', file)
        })

        putUpdate({ formData })
        console.warn(inputs)
        handleOnClose()
    }

    const handleOnDelete = () => {
        delUpdate({ update_id: update.id })
        handleOnClose()
    }

    return (
        <Template onClose={handleOnClose}>
            <div className={styles.PutUpdateModal}>
                <div className={styles.inputWrapper} style={{ gap: 0 }}>
                    <div className={styles.headline}>
                        {'Edit Transaction'}
                    </div>
                    <div className={styles.nodeIds}>
                        {`${link.source.id} -> ${link.target.id}`}
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.inputBar}>
                        <TextInput
                            value={date}
                            onChange={setDate}
                            placeholder={'DD.MM.YYYY'}
                        />
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.inputBar}>
                        <TextInput
                            style={{ flexGrow: 1 }}
                            value={description}
                            onChange={setDescription}
                            placeholder={'Description'}
                        />
                        <TextInput
                            style={{ flexShrink: 0, width: '8rem' }}
                            value={value}
                            onChange={setValue}
                            placeholder={'value'}
                        />
                    </div>
                </div>
                <FileUpload
                    style={{ height: '3.9rem' }}
                    hint='Upload Files'
                    filesArray={newFilesArray}
                    setFilesArray={setNewFilesArray}
                    existingImages={meta.images}
                    setExistingImages={(newImages) => setMeta(prev => ({ ...prev, images: newImages }))}
                />
                <div className={styles.buttonBar}>
                    <TextButton
                        label={'Cancel'}
                        onClick={handleOnClose}
                    />
                    {showDanger ? (
                        <TextButton
                            label={'Delete Update'}
                            onClick={handleOnDelete}
                            type='red'
                        />
                    ) : (
                        <TextButton
                            label={'Danger'}
                            onClick={() => setShowDanger(true)}
                            type='red'
                        />
                    )}
                    <TextButton
                        label={'Confirm'}
                        onClick={handleOnSuccess}
                        type='green'
                    />
                </div>
            </div>
        </Template>
    )
}

export default PutUpdateModal