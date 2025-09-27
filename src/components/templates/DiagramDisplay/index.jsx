import { useState } from 'react'
import DiagramControlBar from '@organisms/DiagramControlBar'
import useSankey from '@services/hooks/useSankey'
import SankeyDisplay from '@molecules/SankeyGraph/SankeyDisplay'
import DiagramStarter from '@organisms/DiagramStarter'
import NodeSidebar from '@organisms/NodeSidebar'
import styles from './DiagramDisplay.module.css'

const DiagramDisplay = ({ height }) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [selectedNodeId, setSelectedNodeId] = useState('')
    const { rawData, formatData, addLink, updateNodeId, updateLinkValue } = useSankey()

    const onClickNode = (nodeData) => {
        if (nodeData.id) {
            setSelectedNodeId(nodeData.id)
            setShowSidebar(true)
        }
    }

    let content
    if (formatData.links.length > 0) {
        content = (
            <>
                <div className={styles.diagramWrapper}>
                    <DiagramControlBar 
                        rawData={rawData}
                        addLink={addLink}
                    />
                    <div className={`${styles.diagram} ${styles.active}`}>
                        <SankeyDisplay sankeyData={formatData} onClickNode={onClickNode} />
                    </div>
                </div>
                {
                    showSidebar && (
                        <div className={styles.sidebarWrapper}>
                            <NodeSidebar
                                selectedNodeId={selectedNodeId}
                                addLink={addLink}
                                setShowSidebar={setShowSidebar}
                                updateLinkValue={updateLinkValue}
                            />
                        </div>
                    )
                }
            </>
        )
    } else {
        content = (
            <div className={styles.diagramWrapper}>
                <DiagramStarter addLink={addLink} />
            </div>
        )
    }

    return (
        <div className={styles.DiagramDisplay} style={{ 'height': `${height}` }}>
            {content}
        </div>
    )
}

export default DiagramDisplay