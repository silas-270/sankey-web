import { useState } from 'react'
import useDevice from '@services/hooks/useDevice'
import useSankeyStore from '@services/zustand/useSankeyStore'
import useSankeyRawStore from '@services/zustand/useSankeyRawStore'
import SankeyDisplay from '@molecules/SankeyGraph/SankeyDisplay'
import DiagramControlBar from '@organisms/DiagramControlBar'
import DiagramSidebar from '@organisms/DiagramSidebar'
import styles from './DiagramDisplay.module.css'

const DiagramDisplay = ({ sankeyData }) => {
    const { isMobile } = useDevice()
    const [showSidebar, setShowSidebar] = useState(false)
    const [selectedNodeId, setSelectedNodeId] = useState('')
    const setData = useSankeyStore((state) => state.setData)
    const graphData = useSankeyRawStore((state) => state.rawSankeyData)

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
        <div className={isMobile ? styles.DiagramMobileDisplay : styles.DiagramDisplay}>
            <div className={isMobile ? styles.diagramMobileWrapper : styles.diagramWrapper}>
                <DiagramControlBar
                    graphData={graphData}
                />
                <div className={styles.diagram}>
                    <SankeyDisplay
                        sankeyData={sankeyData}
                        onSetFormattedData={onSetFormattedData}
                        onClickNode={onClickNode}
                    />
                </div>
            </div>
            {showSidebar && (
                <div className={isMobile ? styles.sidebarMobileWrapper : styles.sidebarWrapper}>
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