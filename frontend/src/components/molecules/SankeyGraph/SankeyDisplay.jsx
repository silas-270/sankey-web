import { useEffect } from 'react'
import { CustomNodeTooltip, CustomLinkTooltip } from './Tooltips/Tooltips'
import { ResponsiveSankey } from '@nivo/sankey'

const SankeyDisplay = ({
    sankeyData,
    onSetFormattedData,
    onClickNode
}) => {
    const defaultLayers = ['links', 'nodes', 'labels']
    const dataLayer = (chartProps) => { // recieves the rendered Data
        useEffect(() => {
            const computedNodes = chartProps.nodes
            const computedLinks = chartProps.links
            const newRenderedData = { 'nodes': computedNodes, 'links': computedLinks }
            onSetFormattedData(newRenderedData)
        }, [chartProps.nodes, chartProps.links])
    }
    const layers = [
        ...defaultLayers,
        dataLayer
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