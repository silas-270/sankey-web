import { useState } from 'react'
import { validateDate } from '@services/validate/validateEntries'
import useSankey from '@services/hooks/useSankey'
import Template from '../Template'
import TextInput from '@atoms/TextInput'
//import SuggestionInput from '@atoms/SuggestionInput'
// RProblem with reredners
import TextButton from '@atoms/TextButton'
import styles from './PutLinkModal.module.css'

const diffInputs = (prevInputs, newInputs) => {
    const update = {}
    update.link_id = prevInputs.id
    if (newInputs.source != prevInputs.source) {
        update.source = newInputs.source
    }
    if (newInputs.target != prevInputs.target) {
        update.target = newInputs.target
    }
    if (newInputs.created_at != prevInputs.created_at) {
        update.created_at = newInputs.created_at
    }
    return update
}

const PutLinkModal = ({ onClose, link, nodeList }) => {
    const { putLink, delLink } = useSankey()
    const [date, setDate] = useState(link.created_at || '')
    const [sourceNode, setSourceNode] = useState(link.source.id || '')
    const [targetNode, setTargetNode] = useState(link.target.id || '')
    const [showDanger, setShowDanger] = useState(false)

    const handleOnClose = () => {
        setDate('')
        setSourceNode('')
        setTargetNode('')
        setShowDanger(false)
        onClose()
    }

    const handleOnSuccess = () => {
        if (!link.id || !sourceNode || !targetNode || validateDate(date)) {
            const updates = diffInputs(
                link,
                {
                    source: sourceNode.trim(),
                    target: targetNode.trim(),
                    created_at: date.trim()
                }
            )
            console.log(updates)
            putLink(updates)
        }
        handleOnClose()
    }

    const handleOnDelete = () => {
        delLink({ link_id: link.id })
        handleOnClose()
    }

    return (
        <Template onClose={handleOnClose}>
            <div className={styles.PutLinkModal}>
                {/* Link Data */}
                <div className={styles.inputWrapper} style={{ gap: 0 }}>
                    <div className={styles.headline}>
                        {'Update Link'}
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
                <div className={styles.buttonBar}>
                    <TextButton
                        label={'Cancel'}
                        onClick={handleOnClose}
                    />
                    {showDanger ? (
                        <TextButton
                            label={'Delete Link'}
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

export default PutLinkModal