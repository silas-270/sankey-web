import { useState } from 'react'
import useSankeyStore from '@services/zustand/useSankeyStore'
import SankeyDisplay from '@molecules/SankeyGraph/SankeyDisplay'
//import DiagramControlBar from '@organisms/DiagramControlBar'
import DiagramSidebar from '@organisms/DiagramSidebar'
import styles from './DiagramDisplay.module.css'

const DiagramDisplay = ({ sankeyData }) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [selectedNodeId, setSelectedNodeId] = useState('')
    const setData = useSankeyStore((state) => state.setData)

    const onSetFormattedData = (newFormattedData) => {
        setData(newFormattedData)
    }

    const onClickNode = (nodeData) => {
        if (!nodeData.target) { // Click on Nodes only
            setSelectedNodeId(nodeData.id)
            setShowSidebar(true)
        } else { // Click on Links
            setSelectedNodeId(nodeData.target.id)
            setShowSidebar(true)
        }
    }

    return (
        <div className={styles.DiagramDisplay}>
            <div className={styles.diagramWrapper}>
                {/*<DiagramControlBar 
                        rawData={rawData}
                    />*/}
                <div className={`${styles.diagram} ${styles.active}`}>
                    <SankeyDisplay
                        sankeyData={sankeyData}
                        onSetFormattedData={onSetFormattedData}
                        onClickNode={onClickNode}
                    />
                </div>
            </div>
            {showSidebar && (
                <div className={styles.sidebarWrapper}>
                    <DiagramSidebar
                        selectedNodeId={selectedNodeId}
                        setShowSidebar={setShowSidebar}
                    />
                </div>
            )}
        </div>
    )
}

export default DiagramDisplay