import { useState } from 'react'
import Modal from '@molecules/Modal'
import NewLinkModal from '@molecules/ModalTemplates/NewLinkModal'
import ListSection from '../ListSection'
import styles from './BudgetSidebar.module.css'

const BudgetSidebar = ({
    nodeData,
    addLink,
    updateNodeId,
    updateLinkValue
}) => {
    const nodeId = nodeData.id
    const nodeValue = nodeData.value
    const nodeSourceList = nodeData.targetLinks
    const nodeTargetList = nodeData.sourceLinks
    
    const [showNewLinkModal, setShowNewLinkModal] = useState(false)
    const [newSourceModal, setNewSourceModal] = useState(false)
    const [connectingNode, setConnectingNode] = useState('')
    const [newNodeValue, setNewNodeValue] = useState('')

    const handleKeyDownIdUpdate = (e) => {
        if (e.key === 'Enter') {
            console.log('enter')
            updateNodeId(nodeId)
            e.target.blur()
        }
    }

    const openNewLinkModal = (source) => {
        setNewSourceModal(source)
        setShowNewLinkModal(true)
    }

    const handleOnClose = () => {
        setConnectingNode('')
        setNewNodeValue('')
        setShowNewLinkModal(false)
    }

    const handleAddSourceLink = () => {
        addLink(connectingNode, nodeId, newNodeValue)
        handleOnClose()
    }

    const handleAddTargetLink = () => {
        addLink(nodeId, connectingNode, newNodeValue)
        handleOnClose()
    }

    return (
        <>
            {/* Headline */}
            <input
                className={styles.title}
                value={nodeId}
                onChange={e => setNodeTitle(e.target.value)}
                onKeyDown={handleKeyDownIdUpdate}
            />

            {/* Source Section */}
            <ListSection
                title={'Sources'}
                target={false}
                amount={nodeValue}
                entryList={nodeSourceList}
                handleCreateNew={() => openNewLinkModal(true)}
                updateLinkValue={updateLinkValue}
                buttonLabel={'Add Source'}
            />

            {/* Target Section */}
            <ListSection
                title={'Expenses'}
                target={true}
                entryList={nodeTargetList}
                handleCreateNew={() => openNewLinkModal(false)}
                updateLinkValue={updateLinkValue}
                buttonLabel={'Add Expense'}
            />

            {/* Modal for adding a new Link */}
            {showNewLinkModal && (
                <Modal onClose={handleOnClose}>
                    <NewLinkModal
                        connectingNode={connectingNode}
                        setConnectingNode={setConnectingNode}
                        nodeValue={newNodeValue}
                        setNodeValue={setNewNodeValue}
                        onClose={handleOnClose}
                        onSuccess={newSourceModal ? handleAddSourceLink : handleAddTargetLink}
                    />
                </Modal>
            )}
        </>
    )
}

export default BudgetSidebar