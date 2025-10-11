import DiagramDisplay from '@templates/DiagramDisplay'
import Spinner from '@atoms/Spinner'
import Satellite from '@assets/Satellite.svg'
import InitialNodeDisplay from '@templates/InitialNodeDisplay'
import AddLinkModal from '@molecules/Modals/AddLinkModal'
import ModalTemplate from '@molecules/Modals/Template'
import useSankey from '@services/hooks/useSankey'
import styles from './DiagramView.module.css'


const DiagramView = () => {
    const { sankeyData, isLoading, error } = useSankey()

    const infoModalStyle = {
        width: '100%',
        maxWidth: '20rem'
    }

    if (isLoading) { // REPLACE 'isLoading'
        return (
            <ModalTemplate style={infoModalStyle}>
                <div className={styles.spinnerWrapper}>
                    <Spinner style={{ fontSize: '6rem' }} />
                </div>
                <div className={styles.infoText}>
                    Fetching Data...
                </div>
            </ModalTemplate>
        )
    } else if (error || sankeyData.error) { // REPLACE 'error'
        return (
            <ModalTemplate style={infoModalStyle}>
                <div className={styles.spinnerWrapper}>
                    <img src={Satellite} alt={'Error'} />
                </div>
                <div className={styles.infoText}>
                    Connection Error
                </div>
            </ModalTemplate>
        )
    } else {
        console.log(sankeyData)
        return (
            <>
                {/* Data available? */}
                {(sankeyData.links && sankeyData.links.length > 0) ? (
                    <div style={{ height: '100vh' }}>
                        <DiagramDisplay sankeyData={sankeyData} />
                    </div>
                ) : (
                    <AddLinkModal />
                )}
            </>
        )
    }
}

export default DiagramView