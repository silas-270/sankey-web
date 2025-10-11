import { useState } from 'react'
import { validateValue } from '@services/validate/validateEntries'
import useSankey from '@services/hooks/useSankey'
import Template from '../Template'
import FileUpload from '@atoms/FileUpload'
import TextInput from '@atoms/TextInput'
//import SuggestionInput from '@atoms/SuggestionInput'
// RProblem with reredners
import TextButton from '@atoms/TextButton'
import styles from './AddLinkModal.module.css'

const AddLinkModal = ({ onClose, nodeList }) => {
    const { addLink } = useSankey()
    const [sourceNode, setSourceNode] = useState('')
    const [targetNode, setTargetNode] = useState('')

    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [meta, setMeta] = useState(null)

    const handleOnClose = () => {
        setSourceNode('')
        setTargetNode('')
        setDescription('')
        setValue('')
        setMeta(null)
        onClose()
    }

    const handleOnSuccess = () => {
        if (!sourceNode || !targetNode || !description || !validateValue(value)) {
            console.error('Missing Input')
            return
        }
        const newLink = {
            source: sourceNode.trim(),
            target: targetNode.trim(),
            update: {
                name: description.trim(),
                value: parseFloat(value),
                meta
            }
        }
        console.log(newLink)
        addLink(newLink)
        handleOnClose()
    }

    return (
        <Template onClose={handleOnClose}>
            <div className={styles.AddLinkModal}>
                {/* Link Data */}
                <div className={styles.inputWrapper} style={{ gap: 0 }}>
                    <div className={styles.headline}>
                        {'Create new Link'}
                    </div>
                    {(sourceNode || targetNode) && (
                        <div className={styles.nodeIds}>
                            {`${sourceNode} -> ${targetNode}`}
                        </div>
                    )}
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.inputBar}>
                        <TextInput
                            style={{ flexGrow: 1 }}
                            value={sourceNode}
                            onChange={setSourceNode}
                            placeholder={'Source Node'}
                        //suggestions={nodeList}
                        />
                        <TextInput
                            style={{ flexGrow: 1 }}
                            value={targetNode}
                            onChange={setTargetNode}
                            placeholder={'Target Node'}
                        //suggestions={nodeList}
                        />
                    </div>
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

export default AddLinkModal