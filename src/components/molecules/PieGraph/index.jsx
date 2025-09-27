import { ResponsivePie } from '@nivo/pie'

const PieGraph = ({ data }) => {
    console.log(data)
    return (
        <ResponsivePie
            data={data}
            colors={datum => datum.data.color}
            innerRadius={0.5}
            padAngle={0.6}
            cornerRadius={2}
            enableArcLabels={false}
            enableArcLinkLabels={false}
            motionConfig="stiff"
            isInteractive={false}
            activeOuterRadiusOffset={4}
        />
    )
}

export default PieGraph
