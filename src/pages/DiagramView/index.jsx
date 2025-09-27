import DiagramDisplay from '@templates/DiagramDisplay'
import styles from './DiagramView.module.css'

const DiagramView = () => {
    return (
        <div className={styles.DiagramView}>
            <div className={styles.headline}>
                Budget Plan
            </div>
            <DiagramDisplay height={'100%'} />
        </div>
    )
}

export default DiagramView