import { useEffect, useState } from 'react'
import DiagramDisplay from '@templates/DiagramDisplay'
import useSankeyRawStore from '@services/zustand/useSankeyRawStore'
import Spinner from '@atoms/Spinner'
import Satellite from '@assets/Satellite.svg'
import ModalTemplate from '@molecules/Modals/Template'
import useSankey from '@services/hooks/useSankey'
import Tutorial from '@templates/Tutorial'
import styles from './DiagramView.module.css'

const DiagramView = () => {
    const { sankeyData, isLoading, error } = useSankey()
    const setData = useSankeyRawStore((state) => state.setData)

    useEffect(() => {
        if (!isLoading && !error && sankeyData && !sankeyData.error) {
            setData(sankeyData)
        }
    }, [isLoading, error, sankeyData, setData])

    const infoModalStyle = {
        width: '100%',
        maxWidth: '20rem'
    }

    console.log(sankeyData)

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
        return (
            <div style={{ height: '100vh', padding: '0.5rem', boxSizing: 'border-box' }}>
                {/* Data available? */}
                {(sankeyData.links && sankeyData.links.length > 0) ? (
                    <DiagramDisplay sankeyData={sankeyData} />
                ) : (
                    <Tutorial />
                )}
            </div>
        )
    }
}

export default DiagramView