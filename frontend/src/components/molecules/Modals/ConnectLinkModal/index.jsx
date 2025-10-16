import { useState } from 'react'
import useSankeyRawStore from '@services/zustand/useSankeyRawStore'
import validateLink from '@services/data/validateLink'
import useSankey from '@services/hooks/useSankey'
import Template from '../Template'
import FileUpload from '@atoms/FileUpload'
import TextInput from '@atoms/TextInput'
import TextButton from '@atoms/TextButton'
import styles from './ConnectLinkModal.module.css'
import { formatValue } from '@services/data/formatEntries'

const ConnectLinkModal = ({
    onClose,
    nodeId,
    isTarget, // Will the new Node be the target?
    title,
    nodeList,
}) => {
    const { addLink } = useSankey()

    const [connectingNode, setConnectingNode] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [filesArray, setFilesArray] = useState([])

    const graphData = useSankeyRawStore((state) => state.rawSankeyData)
    const sourceNode = isTarget ? nodeId : connectingNode
    const targetNode = isTarget ? connectingNode : nodeId

    const handleOnClose = () => {
        setConnectingNode('')
        setDescription('')
        setValue('')
        setFilesArray([])
        onClose()
    }

    const handleOnSuccess = () => {
        const formattedValue = formatValue(value)
        const newLink = {
            source: sourceNode.trim(),
            target: targetNode.trim(),
            update: {
                name: description.trim(),
                value: formattedValue,
            }
        }
        const { success, message } = validateLink(graphData, newLink)
        if (!success) {
            console.warn(message)
            return
        }

        // Collect Data
        const formData = new FormData()

        // Append text fields
        formData.append('source', sourceNode.trim())
        formData.append('target', targetNode.trim())
        formData.append('update', JSON.stringify({
            name: description.trim(),
            value: formattedValue,
            meta: {}
        }))

        // Append files using the key 'images'
        filesArray.forEach((file) => {
            formData.append('images', file)
        })

        addLink({ formData })
        console.warn(newLink)
        handleOnClose()
    }

    return (
        <Template onClose={handleOnClose}>
            <div className={styles.ConnectLinkModal}>
                {/* Link Data */}
                <div className={styles.inputWrapper} style={{ gap: 0 }}>
                    <div className={styles.headline}>
                        {title}
                    </div>
                    {(sourceNode || targetNode) && (
                        <div className={styles.nodeIds}>
                            {`${sourceNode} -> ${targetNode}`}
                        </div>
                    )}
                </div>
                <div className={styles.inputWrapper}>
                    <TextInput
                        value={connectingNode}
                        onChange={setConnectingNode}
                        placeholder={'Connecting Node'}
                    //suggestions={nodeList}
                    />
                </div>

                {/* Update Data */}
                <div className={styles.inputWrapper} style={{ gap: 0 }}>
                    <div className={styles.nodeIds}>
                        {'Connect Inital Transaction'}
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

export default ConnectLinkModal