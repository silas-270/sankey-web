import BudgetSidebar from './BudgetSidebar/BudgetSidebar'
import { useSankeyDataStore } from '@services/zustand/renderdSankeyData'
import styles from './NodeSidebar.module.css'

const NodeSidebar = ({
    selectedNodeId,
    addLink,
    updateNodeId,
    updateLinkValue
}) => {
    const { nodes } = useSankeyDataStore((state) => state.data)
    const nodeData = nodes.find(node => node.id === selectedNodeId)
    const targetLinks = nodeData.targetLinks

    let content
    if (targetLinks.length == 0) {
        content = (
            <BudgetSidebar
                nodeData={nodeData}
                addLink={addLink}
                updateNodeId={updateNodeId}
                updateLinkValue={updateLinkValue}
            />
        )
    } else {
        content = (
            <BudgetSidebar
                nodeData={nodeData}
                addLink={addLink}
                updateNodeId={updateNodeId}
                updateLinkValue={updateLinkValue}
            />
        )
    }

    return (
        <div className={styles.NodeSidebar}>
            {content}
        </div>
    )
}

export default NodeSidebar