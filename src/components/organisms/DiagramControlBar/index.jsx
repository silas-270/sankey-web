import DownloadFile from '@assets/DownloadFile.svg'
import DownloadImage from '@assets/DownloadImage.svg'
import NewSourceBtn from './NewSourceBtn'
import styles from './DiagramControlBar.module.css'

const downloadJSON = (data, fileName) => {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName

    link.click()
}

const DiagramControlBar = ({ addLink, rawData }) => {
    return (
        <div className={styles.DiagramControlBar}>
            <NewSourceBtn addLink={addLink} />
            <div className={styles.exportOptions}>
                <button
                    className={styles.svgBtn}
                    onClick={() => downloadJSON(rawData, 'diagram.json')}
                >
                    <img src={DownloadFile} alt='Download JSON' />
                </button>
                <button
                    className={styles.svgBtn}
                >
                    <img src={DownloadImage} alt='Download Img' />
                </button>
            </div>
        </div>
    )
}

export default DiagramControlBar