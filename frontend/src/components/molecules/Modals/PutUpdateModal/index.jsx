import { useState } from 'react'
import { validateValue, validateDate } from '@services/validate/validateEntries'
import useSankey from '@services/hooks/useSankey'
import Template from '../Template'
import FileUpload from '@atoms/FileUpload'
import TextInput from '@atoms/TextInput'
import TextButton from '@atoms/TextButton'
import styles from './PutUpdateModal.module.css'

const diffInputs = (prevInputs, newInputs) => {
    const update = {}
    update.update_id = prevInputs.id
    if (newInputs.name != prevInputs.name) {
        update.name = newInputs.name
    }
    if (newInputs.value != prevInputs.value) {
        update.value = newInputs.value
    }
    if (newInputs.meta != prevInputs.meta) {
        update.meta = newInputs.meta
    }
    if (newInputs.created_at != prevInputs.created_at) {
        update.created_at = newInputs.created_at
    }
    return update
}

const PutUpdateModal = ({ onClose, link, update }) => {
    const { putUpdate, delUpdate } = useSankey()
    const [date, setDate] = useState(update.created_at || '')
    const [description, setDescription] = useState(update.name || '')
    const [value, setValue] = useState(update.value || '')
    const [meta, setMeta] = useState(update.meta || {})
    const [showDanger, setShowDanger] = useState(false)

    const handleOnClose = () => {
        setDate('')
        setDescription('')
        setValue('')
        setMeta(null)
        onClose()
    }

    const handleOnSuccess = () => {
        if (!update.id || !validateDate(date) || !description || !validateValue(value)) {
            console.error('Update Params missing')
        }
        const updates = diffInputs(
            update,
            {
                name: description.trim(),
                value: parseFloat(value),
                meta,
                created_at: date.trim()
            }
        )
        console.log(updates)
        putUpdate(updates)
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