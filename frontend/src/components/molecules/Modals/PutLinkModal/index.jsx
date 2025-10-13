import { useState } from 'react'
import { formatDateToISO, formatDateFromISO } from '@services/data/formatEntries'
import useSankeyRawStore from '@services/zustand/useSankeyRawStore'
import validateLink from '@services/data/validateLink'
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

const PutLinkModal = ({ onClose, link, isTarget, nodeList }) => {
    const { putLink, delLink } = useSankey()
    const graphData = useSankeyRawStore((state) => state.rawSankeyData)
    const [date, setDate] = useState(formatDateFromISO(link.created_at) || '')
    const [showDanger, setShowDanger] = useState(false)
    const [connectingNode, setConnectingNode] = useState((isTarget ? link.source.id : link.target.id) || '')

    const sourceNode = isTarget ? connectingNode : link.source.id
    const targetNode = isTarget ? link.target.id : connectingNode

    const handleOnClose = () => {
        setDate('')
        setConnectingNode('')
        setShowDanger(false)
        onClose()
    }

    const handleOnSuccess = () => {
        const formattedDate = formatDateToISO(date)
        if (!formattedDate) {
            console.warn('Date must be in DD.MM.YYYY format')
            return
        }
        const inputs = {
            source: sourceNode.trim(),
            target: targetNode.trim(),
            created_at: formattedDate.trim()
        }
        const { success, message } = validateLink(graphData, inputs, true)
        if (!success) {
            console.warn(message)
            return
        }
        const updates = diffInputs(link, inputs)
        console.log(updates)
        putLink(updates)
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
                    <div className={styles.inputBar} style={{ alignItems: 'center' }}>
                        <div className={styles.nodeText}>
                            {isTarget ? 'Source Node:' : 'Target Node:'}
                        </div>
                        <TextInput
                            style={{ flexGrow: 1 }}
                            value={connectingNode}
                            onChange={setConnectingNode}
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