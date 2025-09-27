import { useState } from 'react'
import Modal from '@molecules/Modal'
import NewLinkModal from '@molecules/ModalTemplates/NewLinkModal'
import ListSection from '../ListSection'
import styles from './BudgetSidebar.module.css'

const BudgetSidebar = ({
    ids,
    nodeData,
    addLink,
    delteLink,
    updateLinkValue
}) => {
    const nodeId = nodeData.id
    const nodeSourceList = nodeData.targetLinks
    const nodeTargetList = nodeData.sourceLinks

    const [showNewLinkModal, setShowNewLinkModal] = useState(false)
    const [connectingNode, setConnectingNode] = useState('')
    const [newNodeValue, setNewNodeValue] = useState('')

    const handleOnClose = () => {
        setConnectingNode('')
        setNewNodeValue('')
        setShowNewLinkModal(false)
    }

    const handleAddTargetLink = () => {
        addLink(nodeId, connectingNode, newNodeValue)
        handleOnClose()
    }

    return (
        <>
            {/* Source Section */}
            <ListSection
                title={'Sources Linked'}
                target={false}
                entryList={nodeSourceList}
            />

            {/* Target Section */}
            <ListSection
                title={'Expenses'}
                target={true}
                editable={true}
                entryList={nodeTargetList}
                delteLink={delteLink}
                handleCreateNew={() => setShowNewLinkModal(true)}
                updateLinkValue={updateLinkValue}
                buttonLabel={'Add Expense'}
            />

            {/* Modal for adding a new Link */}
            {showNewLinkModal && (
                <Modal onClose={handleOnClose}>
                    <NewLinkModal
                        ids={ids}
                        nodeInputPlaceholder={'Expense Id'}
                        newSourceModal={false}
                        connectingNode={connectingNode}
                        setConnectingNode={setConnectingNode}
                        nodeValue={newNodeValue}
                        setNodeValue={setNewNodeValue}
                        onClose={handleOnClose}
                        onSuccess={handleAddTargetLink}
                    />
                </Modal>
            )}
        </>
    )
}

export default BudgetSidebar