import { useState, useEffect } from 'react'
import useSankeyStore from '@services/zustand/useSankeyStore'
import AddLinkButton from './AddLinkButton'
import ConnectLinkModal from '@molecules/Modals/ConnectLinkModal'
import LinkNode from './LinkNode'
import NotesField from './NotesField'
import styles from './DiagramSidebar.module.css'

const DiagramSidebar = ({
    selectedNodeId,
    onClose
}) => {
    const { nodes } = useSankeyStore((state) => state.formattedSankeyData)
    const nodeData = nodes.find(node => node.id === selectedNodeId)

    const [showNewSourceModal, setShowNewSourceModal] = useState(false)
    const [showNewTargetModal, setShowNewTargetModal] = useState(false)

    const [selectedLink, setSelectedLink] = useState('')

    const [notes, setNotes] = useState('')

    useEffect(() => {
        setSelectedLink('')
    }, [selectedNodeId])

    useEffect(() => {
        if (!nodeData) {
            onClose()
        }
    }, [nodeData, onClose])

    if (!nodeData) {
        return (
            <div>Empty</div>
        )
    }

    const targetLinks = nodeData.sourceLinks
    const sourceLinks = nodeData.targetLinks

    // Extract Ids for Ghost Completion
    const ids = nodes.map(item => (item.id))

    return (
        <div className={styles.DiagramSidebar}>
            {/* Headine Section */}
            <div className={styles.headlineWrapper}>
                <div className={styles.nameGroup}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        {'>'}
                    </button>
                    <div className={styles.name}>{nodeData.id}</div>
                </div>
                <div>{`${nodeData.value.toFixed(2)}$`}</div>
            </div>

            {/* Notes */}
            <div className={styles.sectionHeadline}>Notes</div>
            <NotesField
                notes={notes}
                setNotes={setNotes}
            />

            {/* Sources */}
            <div className={styles.sectionHeadline}>Linked Sources</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sourceLinks.map((sourceLink) => (
                    <LinkNode
                        key={sourceLink.id}
                        selectedLink={selectedLink}
                        setSelectedLink={setSelectedLink}
                        nodeList={ids}
                        link={sourceLink}
                        isTarget={true}
                        editable={true}
                    />
                ))}
                <AddLinkButton
                    label={'Add new Source'}
                    onClick={() => setShowNewSourceModal(true)}
                />
            </div>
            {showNewSourceModal && (
                <ConnectLinkModal
                    title={'Connect Source'}
                    onClose={() => setShowNewSourceModal(false)}
                    nodeId={selectedNodeId}
                    isTarget={false}
                    nodeList={ids}
                />
            )}

            {/* Expenses */}
            <div className={styles.sectionHeadline}>Linked Expenses</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {targetLinks.map((targetLink) => (
                    <LinkNode
                        key={targetLink.id}
                        selectedLink={selectedLink}
                        setSelectedLink={setSelectedLink}
                        nodeList={ids}
                        link={targetLink}
                        isTarget={false}
                        editable={true}
                    />
                ))}
                <AddLinkButton
                    label={'Add new Expense'}
                    onClick={() => setShowNewTargetModal(true)}
                />
            </div>
            {showNewTargetModal && (
                <ConnectLinkModal
                    title={'Connect Expense'}
                    onClose={() => setShowNewTargetModal(false)}
                    nodeId={selectedNodeId}
                    isTarget={true}
                    nodeList={ids}
                />
            )}
        </div>
    )
}

export default DiagramSidebar