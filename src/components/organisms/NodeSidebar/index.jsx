import SourceSidebar from './SourceSidebar'
import BudgetSidebar from './BudgetSidebar'
import ExpenseSidebar from './ExpenseSidebar'
import { useSankeyDataStore } from '@services/zustand/renderdSankeyData'
import styles from './NodeSidebar.module.css'

const NodeSidebar = ({
    selectedNodeId,
    addLink,
    setShowSidebar,
    updateLinkValue
}) => {
    const { nodes } = useSankeyDataStore((state) => state.data)
    const nodeData = nodes.find(node => node.id === selectedNodeId)
    const targetLinks = nodeData.targetLinks
    const depth = nodeData.depth

    const ids = nodes.map(item => {
        if (item && item.hasOwnProperty('id')) {
            return item.id;
        } else {
            console.warn('Missing "id" field in one of the objects')
        }
    })

    const handleDeleteLink = (sourceId, targetId) => {
        const sourceLinks = nodeData.sourceLinks
        if (sourceLinks.length + targetLinks.length < 2) {
            setShowSidebar(false)
        }
        updateLinkValue(sourceId, targetId, 0)
    }

    let content = (
        <div className={styles.headlineWrapper}>
            <div className={styles.nameGroup}>
                <button className={styles.closeBtn} onClick={() => setShowSidebar(false)}>
                    {'>'}
                </button>
                <div className={styles.name}>{nodeData.id}</div>
            </div>
            <div>{`${nodeData.value}$`}</div>
        </div>
    )

    if (depth == 0 && targetLinks.length == 0) {
        content = (
            <>
                {content}
                <SourceSidebar
                    ids={ids}
                    nodeData={nodeData}
                    addLink={addLink}
                    delteLink={handleDeleteLink}
                    updateLinkValue={updateLinkValue}
                />
            </>
        )
    } else if (depth == 1) {
        content = (
            <>
                {content}
                <BudgetSidebar
                    ids={ids}
                    nodeData={nodeData}
                    addLink={addLink}
                    delteLink={handleDeleteLink}
                    updateLinkValue={updateLinkValue}
                />
            </>
        )
    } else {
        content = (
            <>
                {content}
                <ExpenseSidebar
                    ids={ids}
                    nodeData={nodeData}
                    addLink={addLink}
                    delteLink={handleDeleteLink}
                    updateLinkValue={updateLinkValue}
                />
            </>
        )
    }

    return (
        <div className={styles.NodeSidebar}>
            {content}
        </div>
    )
}

export default NodeSidebar