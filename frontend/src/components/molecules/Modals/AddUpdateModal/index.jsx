import { useState } from 'react'
import { validateValue } from '@services/validate/validateEntries'
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
    const [meta, setMeta] = useState(null)

    const handleOnClose = () => {
        setDescription('')
        setValue('')
        setMeta(null)
        onClose()
    }

    const handleOnSuccess = () => {
        if (!link.id || !validateValue(value) || !description) {
            console.error('Input fields missing')
            return
        }
        const newUpdate = {
            link_id: link.id,
            name: description.trim(),
            value: parseFloat(value),
            meta,
        }
        console.log(newUpdate)
        addUpdate(newUpdate)
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