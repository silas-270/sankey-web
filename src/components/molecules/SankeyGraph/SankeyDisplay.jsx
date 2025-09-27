import { useEffect } from 'react'
import { CustomNodeTooltip, CustomLinkTooltip } from './Tooltips/Tooltips'
import { useSankeyDataStore } from '@services/zustand/renderdSankeyData'
import { ResponsiveSankey } from '@nivo/sankey'

// This layer will receive all computed chart data as props (nodes, links, etc.)
const ConsoleLoggerLayer = (chartProps) => {

    const setJson = useSankeyDataStore((state) => state.setJson)

    // Use a flag to ensure logging happens only once per data load/change
    useEffect(() => {
        const computedNodes = chartProps.nodes
        const computedLinks = chartProps.links
        const newRenderedData = { 'nodes': computedNodes, 'links': computedLinks }

        // Set Zustand to new data
        setJson(newRenderedData)

    }, [chartProps.nodes, chartProps.links]) // Re-run if nodes or links change
}

const SankeyDisplay = ({
    sankeyData,
    onClickNode
}) => {
    const defaultLayers = ['links', 'nodes', 'labels']
    const layers = [
        ...defaultLayers, // Includes 'links', 'nodes', 'labels', etc.
        ConsoleLoggerLayer // <-- The layer that prints data to the console
    ]

    return (
        <ResponsiveSankey
            data={sankeyData}
            nodeTooltip={CustomNodeTooltip}
            linkTooltip={CustomLinkTooltip}
            margin={{ right: 20, left: 20 }}
            align='start'
            nodeOpacity={1}
            nodeHoverOthersOpacity={0.35}
            nodeThickness={25}
            nodeSpacing={21}
            nodeBorderRadius={3}
            linkOpacity={0.5}
            linkHoverOthersOpacity={0.1}
            linkContract={1}
            enableLinkGradient={true}
            labelPosition='outside'
            labelOrientation='vertical'
            motionConfig='default'
            //animate={false}
            labelPadding={16}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
            onClick={(node) => onClickNode(node)}
            layers={layers}
        />
    )
}

export default SankeyDisplay