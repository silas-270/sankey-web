import { useState } from 'react'
import { formatValue } from '@services/data/formatEntries'
import validateUpdate from '@services/data/validateUpdate'
import useSankey from '@services/hooks/useSankey'
import Template from '../Template'
import FileUpload from '@atoms/FileUpload'
import TextInput from '@atoms/TextInput'
import TextButton from '@atoms/TextButton'
import styles from './AddUpdateModal.module.css'

const AddUpdateModal = ({ onClose, link }) => {
    const { addUpdate } = useSankey()

    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [filesArray, setFilesArray] = useState([])

    const handleOnClose = () => {
        setDescription('')
        setValue('')
        setFilesArray([])
        onClose()
    }

    const handleOnSuccess = () => {
        const formattedValue = formatValue(value, true)
        const newUpdate = {
            link_id: link.id,
            name: description.trim(),
            value: formattedValue,
        }
        const { success, message } = validateUpdate(newUpdate)
        if (!success) {
            console.warn(message)
            return
        }

        // Collect data
        const formData = new FormData()

        // Append text fields
        formData.append('link_id', link.id)
        formData.append('name', description.trim())
        formData.append('value', formattedValue)
        formData.append('meta', {})

        // Append files using the key 'images'
        filesArray.forEach((file) => {
            formData.append('images', file)
        })

        addUpdate(formData)
        console.warn(newUpdate)
        handleOnClose()
    }

    return (
        <Template onClose={handleOnClose}>
            <div className={styles.AddUpdateModal}>
                <div className={styles.inputWrapper} style={{ gap: 0 }}>
                    <div className={styles.headline}>
                        {'Create Transaction'}
                    </div>
                    <div className={styles.nodeIds}>
                        {`${link.source.id} -> ${link.target.id}`}
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
                    filesArray={filesArray}
                    setFilesArray={setFilesArray}
                />
                <div className={styles.buttonBar}>
                    <TextButton
                        label={'Cancel'}
                        onClick={handleOnClose}
                    />
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

export default AddUpdateModal