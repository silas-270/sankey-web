import Help from '@assets/Help.svg'
import Tooltip from '@atoms/Tooltip'
import styles from './InfoPoint.module.css'

const InfoPoint = ({ text, position, style, tooltipWidth }) => (
    <div className={styles.InfoPoint} style={style}>
        <Tooltip text={text} position={position} tooltipWidth={tooltipWidth}>
            <img src={Help} />
        </Tooltip>
    </div>
)

export default InfoPoint