import { useState } from 'react'
import useSankey from '../../../services/hooks/useSankey'
import styles from './DiagramDisplay.module.css'
import SankeyDisplay from '../../molecules/SankeyGraph/SankeyDisplay'
import NodeSidebar from '@organisms/NodeSidebar'

const DiagramDisplay = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [selectedNodeId, setSelectedNodeId] = useState('')
    const { formatData, addLink, updateNodeId, updateLinkValue } = useSankey()

    const onClickNode = (nodeData) => {
        console.log(nodeData)
        if (nodeData.id) {
            setSelectedNodeId(nodeData.id)
            setShowSidebar(true)
        }
    }

    const handleUpdateNodeId = (newId) => {
        setShowSidebar(false)
        updateNodeId(selectedNodeId, newId)
        setSelectedNodeId(newId)
    }

    return (
        <div className={styles.DiagramDisplay}>
            <div className={styles.diagramWrapper}>
                <SankeyDisplay sankeyData={formatData} onClickNode={onClickNode} />
            </div>
            {showSidebar && (
                <div className={styles.sidebarWrapper}>
                    <NodeSidebar
                        selectedNodeId={selectedNodeId}
                        addLink={addLink}
                        updateNodeId={handleUpdateNodeId}
                        updateLinkValue={updateLinkValue}
                    />
                </div>
            )}
        </div>
    )
}

export default DiagramDisplay