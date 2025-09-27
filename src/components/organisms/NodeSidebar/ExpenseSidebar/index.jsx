import { useState } from 'react'
import PieGraph from '@molecules/PieGraph'
import Modal from '@molecules/Modal'
import NewLinkModal from '@molecules/ModalTemplates/NewLinkModal'
import ListSection from '../ListSection'
import styles from './ExpenseSidebar.module.css'

const ExpenseSidebar = ({
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
    const [newSourceModal, setNewSourceModal] = useState(false)
    const [connectingNode, setConnectingNode] = useState('')
    const [newNodeValue, setNewNodeValue] = useState('')

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

    // Format Data for Pie Chart
    const pieFormattedSources = nodeSourceList.map(({ source: { id }, value, source: { color } }) => ({ id, value, color }))
    const pieFormattetTargets = nodeTargetList.map(({ target: { id }, value, target: { color } }) => ({ id, value, color }))

    return (
        <>
            {/* Source Section */}
            <ListSection
                title={'Sources'}
                editable={true}
                target={false}
                entryList={nodeSourceList}
                delteLink={delteLink}
                handleCreateNew={() => openNewLinkModal(true)}
                updateLinkValue={updateLinkValue}
                buttonLabel={'Add Source'}
            />

            {/* Target Section */}
            <ListSection
                title={'Expenses'}
                editable={true}
                target={true}
                entryList={nodeTargetList}
                delteLink={delteLink}
                handleCreateNew={() => openNewLinkModal(false)}
                updateLinkValue={updateLinkValue}
                buttonLabel={'Add Expense'}
            />

            {/* Source Pie Chart */}
            {/*<div className={styles.pieChartWrapper}>
                <div className={styles.pieChartWidget}>
                    <PieGraph data={pieFormattedSources} />
                </div>
                <div className={styles.pieChartWidget}>
                    <PieGraph data={pieFormattetTargets} />
                </div>
            </div>*/}

            {/* Modal for adding a new Link */}
            {showNewLinkModal && (
                <Modal onClose={handleOnClose}>
                    <NewLinkModal
                        ids={ids}
                        nodeInputPlaceholder={newSourceModal ? 'Source Id' : 'Expense Id'}
                        newSourceModal={newSourceModal}
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

export default ExpenseSidebar